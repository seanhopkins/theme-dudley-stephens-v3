# ================================ Customizable Settings ================================
# ================================================================
# Product Discounts by Customer Tag
#
# If we have a matching customer (by tag), the entered discount
# will be applied to any matching items.
#
#   - 'customer_tag_match_type' determines whether we look for the customer
#     to be tagged with any of the entered tags or not. Can be:
#       - ':include' to check if the customer is tagged
#       - ':exclude' to make sure the customer isn't tagged
#   - 'customer_tags' is a list of tags to identify qualified
#     customers
#   - 'product_selector_match_type' determines whether we look for
#     products that do or don't match the entered selectors. Can
#     be:
#       - ':include' to check if the product does match
#       - ':exclude' to make sure the product doesn't match
#   - 'product_selector_type' determines how eligible products
#     will be identified. Can be either:
#       - ':tag' to find products by tag
#       - ':type' to find products by type
#       - ':vendor' to find products by vendor
#       - ':product_id' to find products by ID
#       - ':variant_id' to find products by variant ID
#       - ':subscription' to find subscription products
#       - ':all' for all products
#   - 'product_selectors' is a list of identifiers (from above)
#     for qualifying products. Product/Variant ID lists should
#     only contain numbers (ie. no quotes). If ':all' is used,
#     this can also be 'nil'.
#   - 'discount_type' is the type of discount to provide. Can be
#     either:
#       - ':percent'
#       - ':dollar'
#   - 'discount_amount' is the percentage/dollar discount to
#     apply (per item)
#   - 'discount_message' is the message to show when a discount
#     is applied
# ================================================================
DISCOUNTS_FOR_CUSTOMER_TAG = [
  {
    customer_tag_match_type: :include,
    customer_tags: ["swell_vip_fanatics", "swell_vip_family"],
    product_selector_match_type: :include,
    product_selector_type: :product_id,
    product_selectors: [6786596175914], # monogram product ID
    discount_type: :percent,
    discount_amount: 100,
    discount_message: "Free monogramming for Fanatics!",
  },
  {
    customer_tag_match_type: :include,
    customer_tags: ["swell_vip_fanatics", "swell_vip_family"],
    product_selector_match_type: :include,
    product_selector_type: :product_id,
    product_selectors: [6707885932586], # gift wrapping product ID
    discount_type: :percent,
    discount_amount: 100,
    discount_message: "Free gift wrapping for Fanatics!",
  },
]

# ================================================================
# Spend $X, get Product Y for Z Discount
#
# If the cart total is greater than (or equal to) the entered
# threshold (less the discounted amount), the entered number of
# matching items is discounted by the entered amount.
#
#   - 'product_selector_match_type' determines whether we look for
#     products that do or don't match the entered selectors. Can
#     be:
#       - ':include' to check if the product does match
#       - ':exclude' to make sure the product doesn't match
#   - 'product_selector_type' determines how eligible products
#     will be identified. Can be either:
#       - ':tag' to find products by tag
#       - ':type' to find products by type
#       - ':vendor' to find products by vendor
#       - ':product_id' to find products by ID
#       - ':variant_id' to find products by variant ID
#       - ':subscription' to find subscription products
#       - ':all' for all products
#   - 'product_selectors' is a list of identifiers (from above)
#     for qualifying products. Product/Variant ID lists should
#     only contain numbers (ie. no quotes). If ':all' is used,
#     this can also be 'nil'.
#   - 'threshold' is the dollar amount needed to spend to qualify
#   - 'quantity_to_discount' is the number of items to discount
#     if qualified
#   - 'discount_type' is the type of discount to provide. Can be
#     either:
#       - ':percent'
#       - ':dollar'
#   - 'discount_amount' is the percentage/dollar discount to
#     apply (per item)
#   - 'discount_message' is the message to show when a discount
#     is applied
# ================================================================
SPENDX_GETY_FORZ = [
  {
    product_property_key: '_is_gwp',
    product_selector_match_type: :include,
    product_selector_type: :product_id,
    product_selectors: [7300989288490],
    threshold: 50,
    quantity_to_discount: 1,
    discount_type: :percent,
    discount_amount: 100,
    discount_message: 'Spend $50 get a free gift',
  },
  {
    product_property_key: '_is_gwp',
    product_selector_match_type: :include,
    product_selector_type: :product_id,
    product_selectors: [7300989288490],
    threshold: 150,
    quantity_to_discount: 1,
    discount_type: :percent,
    discount_amount: 100,
    discount_message: 'Spend $150 get a free gift',
  },
]

# ================================ Script Code (do not edit) ================================
# ================================================================
# ProductSelector
#
# Finds matching products by the entered criteria.
# ================================================================
class ProductSelector
  def initialize(match_type, selector_type, selectors)
    @match_type = match_type
    @comparator = match_type == :include ? 'any?' : 'none?'
    @selector_type = selector_type
    @selectors = selectors
  end

  def match?(line_item)
    if self.respond_to?(@selector_type)
      self.send(@selector_type, line_item)
    else
      raise RuntimeError.new('Invalid product selector type')
    end
  end

  def tag(line_item)
    product_tags = line_item.variant.product.tags.map { |tag| tag.downcase.strip }
    @selectors = @selectors.map { |selector| selector.downcase.strip }
    (@selectors & product_tags).send(@comparator)
  end

  def type(line_item)
    @selectors = @selectors.map { |selector| selector.downcase.strip }
    (@match_type == :include) == @selectors.include?(line_item.variant.product.product_type.downcase.strip)
  end

  def vendor(line_item)
    @selectors = @selectors.map { |selector| selector.downcase.strip }
    (@match_type == :include) == @selectors.include?(line_item.variant.product.vendor.downcase.strip)
  end

  def product_id(line_item)
    (@match_type == :include) == @selectors.include?(line_item.variant.product.id)
  end

  def variant_id(line_item)
    (@match_type == :include) == @selectors.include?(line_item.variant.id)
  end

  def property(line_item)
    (@match_type == :include) == line_item.properties.has_key?(@selectors)
  end

  def subscription(line_item)
    !line_item.selling_plan_id.nil?
  end

  def all(line_item)
    true
  end
end

# ================================================================
# DiscountApplicator
#
# Applies the entered discount to the supplied line item.
# ================================================================
class DiscountApplicator
  def initialize(discount_type, discount_amount, discount_message)
    @discount_type = discount_type
    @discount_message = discount_message

    @discount_amount = if discount_type == :percent
      1 - (discount_amount * 0.01)
    else
      Money.new(cents: 100) * discount_amount
    end
  end

  def apply(line_item)
    new_line_price = if @discount_type == :percent
      line_item.line_price * @discount_amount
    else
      [line_item.line_price - (@discount_amount * line_item.quantity), Money.zero].max
    end

    line_item.change_line_price(new_line_price, message: @discount_message)
  end
end

# ================================================================
# DiscountLoop
#
# Loops through the supplied line items and discounts the supplied
# number of items by the supplied discount.
# ================================================================
class DiscountLoop
  def initialize(discount_applicator)
    @discount_applicator = discount_applicator
  end

  def loop_items(cart, line_items, num_to_discount)
    line_items.each do |line_item|
      break if num_to_discount <= 0

      if line_item.quantity > num_to_discount
        split_line_item = line_item.split(take: num_to_discount)
        @discount_applicator.apply(split_line_item)
        position = cart.line_items.find_index(line_item)
        cart.line_items.insert(position + 1, split_line_item)
        break
      else
        @discount_applicator.apply(line_item)
        num_to_discount -= line_item.quantity
      end
    end
  end
end

# ================================================================
# CustomerTagSelector
#
# Finds whether the supplied customer has any of the entered tags.
# ================================================================
class CustomerTagSelector
  def initialize(match_type, tags)
    @comparator = match_type == :include ? 'any?' : 'none?'
    @tags = tags.map { |tag| tag.downcase.strip }
  end

  def match?(customer)
    customer_tags = customer.tags.map { |tag| tag.downcase.strip }
    (@tags & customer_tags).send(@comparator)
  end
end

# ================================================================
# DiscountForCustomerTagCampaign
#
# If we have a matching customer (by tag), the entered discount
# is applied to any matching items.
# ================================================================
class DiscountForCustomerTagCampaign
  def initialize(campaigns)
    @campaigns = campaigns
  end

  def run(cart)
    return unless cart.customer&.tags

    @campaigns.each do |campaign|
      customer_tag_selector = CustomerTagSelector.new(campaign[:customer_tag_match_type], campaign[:customer_tags])

      next unless customer_tag_selector.match?(cart.customer)

      product_selector = ProductSelector.new(
        campaign[:product_selector_match_type],
        campaign[:product_selector_type],
        campaign[:product_selectors]
      )

      discount_applicator = DiscountApplicator.new(
        campaign[:discount_type],
        campaign[:discount_amount],
        campaign[:discount_message]
      )

      cart.line_items.each do |line_item|
        next unless product_selector.match?(line_item)
        discount_applicator.apply(line_item)
      end
    end
  end
end

# ================================================================
# SpendXGetYForZCampaign
#
# If the cart total is greater than (or equal to) the entered
# threshold (less the discounted amount), the entered number of
# matching items is discounted by the entered amount.
# ================================================================
class SpendXGetYForZCampaign
  def initialize(campaigns)
    @campaigns = campaigns
    @gwp_in_cart = false
  end

  def run(cart)
    @campaigns.each do |campaign|
      # if GWP already in cart, bail
      break if @gwp_in_cart

      threshold = Money.new(cents: 100) * campaign[:threshold]

      next if cart.subtotal_price < threshold

      product_selector = ProductSelector.new(
        campaign[:product_selector_match_type],
        campaign[:product_selector_type],
        campaign[:product_selectors]
      )

      eligible_items_round_1 = cart.line_items.select { |line_item| product_selector.match?(line_item) }

      gwp_product_selector = ProductSelector.new(
        :include,
        :property,
        '_is_gwp'
      )

      # another round of filtering
      eligible_items = eligible_items_round_1.select { |line_item| gwp_product_selector.match?(line_item) }

      next if eligible_items.nil?

      eligible_items = eligible_items.sort_by { |line_item| line_item.variant.price }
      num_to_discount = campaign[:quantity_to_discount]
      cart_total = cart.subtotal_price

      eligible_items.each do |line_item|
        break if num_to_discount <= 0

        if line_item.quantity > num_to_discount
          cart_total -= line_item.variant.price * num_to_discount
          break
        else
          cart_total -= line_item.line_price
          num_to_discount -= line_item.quantity
        end
      end

      next if cart_total < threshold

      discount_applicator = discount_applicator = DiscountApplicator.new(
        campaign[:discount_type],
        campaign[:discount_amount],
        campaign[:discount_message]
      )

      discount_loop = DiscountLoop.new(discount_applicator)
      discount_loop.loop_items(cart, eligible_items, campaign[:quantity_to_discount])

      # only allow a single GWP product
      if eligible_items.length > 0
        @gwp_in_cart = true
      end
    end
  end
end

CAMPAIGNS = [
  SpendXGetYForZCampaign.new(SPENDX_GETY_FORZ),
  DiscountForCustomerTagCampaign.new(DISCOUNTS_FOR_CUSTOMER_TAG),
]

CAMPAIGNS.each do |campaign|
  campaign.run(Input.cart)
end

Output.cart = Input.cart
