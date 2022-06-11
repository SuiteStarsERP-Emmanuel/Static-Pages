{{#if hasCategories}}
	<div class="facets-faceted-navigation-facet-group">
		<div class="facets-faceted-navigation-title">
			{{translate 'Shop: $(0)' categoryItemId}}
		</div>
		<div class="enhancedpdp-facets-faceted-navigation-category-wrapper">
			<div data-type="facet" data-facet-id="category"></div>
		</div>
	</div>
{{/if}}

{{#if hasFacetsOrAppliedFacets}}
	<!--<h3 class="facets-faceted-navigation-title">{{translate 'Narrow By'}}</h3>-->

	<!--<h4 class="facets-faceted-navigation-results">
		{{#if keywords}}
			{{#if isTotalProductsOne}}
				{{translate '1 Result for <span class="facets-faceted-navigation-title-alt">$(0)</span>' keywords}}
			{{else}}
				{{translate '$(0) Results for <span class="facets-faceted-navigation-title-alt">$(1)</span>' totalProducts keywords}}
			{{/if}}
		{{else}}
			{{#if isTotalProductsOne}}
				{{translate '1 Product'}}
			{{else}}
				{{translate '$(0) Products' totalProducts}}
			{{/if}}
		{{/if}}
	</h4>-->

<!--
	{{#if hasAppliedFacets}}
		<a href="{{clearAllFacetsLink}}" class="facets-faceted-navigation-facets-clear">
			<span>{{translate 'Clear All'}}</span>
			<i class="facets-faceted-navigation-facets-clear-icon"></i>
		</a>
	{{/if}}
-->

	<div data-view="Facets.FacetedNavigationItems"></div>
	<div class="facets-faceted-navigation-item-facet-group">
		<a href="#" class="collapse facets-faceted-navigation-item-facet-group-expander collapsed" data-toggle="collapse" data-target="#device-compatibility-wrapper" data-type="collapse" title="Device Compatibility">
			<i class="facets-faceted-navigation-item-facet-group-expander-icon"></i>
			<h4 class="facets-faceted-navigation-item-facet-group-title">Device Compatibility</h4>
		</a>
		<div data-view="Facets.FacetedNavigationItems.DeviceCompatibility" id="device-compatibility-wrapper" class="facets-faceted-navigation-device-compatibility-wrapper"></div>
	</div>
{{/if}}



{{!----
Use the following context variables when customizing this template:

	totalProducts (Number)
	isTotalProductsOne (Boolean)
	keywords (undefined)
	clearAllFacetsLink (String)
	hasCategories (Boolean)
	hasItems (Number)
	hasFacets (Number)
	hasCategoriesAndFacets (Boolean)
	appliedFacets (Array)
	hasAppliedFacets (Boolean)
	hasFacetsOrAppliedFacets (Number)

----}}
