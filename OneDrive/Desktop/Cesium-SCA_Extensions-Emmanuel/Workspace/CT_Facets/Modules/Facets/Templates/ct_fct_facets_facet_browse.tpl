<section class="facets-facet-browse">
	<div data-cms-area="item_list_banner" data-cms-area-filters="page_type"></div>

				{{#if isCategory}}
					<div class="facets-facet-browse-category">
						<div data-view="Facets.Browse.CategoryHeading"></div>

						<div data-view="Facets.CategoryCells"></div>
					</div>
				{{/if}}

	{{#if showResults}}
		<div class="facets-facet-browse-content">
		{{#if showItems}}
					<h1 class="enhancedplp-facets-facet-browse-title-keywords" data-quantity="{{total}}">
						{{#if keywords}}
							{{translate 'Search Results for "<span class="facets-facet-browse-title-alt">$(0)</span>"' keywords}}
						{{/if}}
					</h1>
		{{/if}}

			<div class="facets-facet-browse-facets" data-action="pushable" data-id="product-search-facets">

				<div data-cms-area="facet_navigation_top" data-cms-area-filters="page_type"></div>

				{{#if showItems}}
					<h1 class="enhancedplp-facets-facet-browse-title" data-quantity="{{total}}">
						{{#if isTotalProductsOne}}
							{{translate '1 Product'}}
						{{else}}
							{{translate '$(0) Products' total}}
						{{/if}}
					</h1>
					
					<div class="facets-facet-browse-narrowedby" data-view="Facets.FacetsDisplay"></div>
				{{/if}}

				{{#if isCategory}}
					<div data-view="Facets.CategorySidebar" class="facets-facet-browse-facets-sidebar"></div>
				{{/if}}

				<div data-view="Facets.FacetedNavigation" data-exclude-facets="commercecategoryname,category"></div>

				<div data-cms-area="facet_navigation_bottom" data-cms-area-filters="page_type"></div>
			</div>

			<!--
			Sample of how to add a particular facet into the HTML. It is important to specify the data-facet-id="<facet id>"
			properly <div data-view="Facets.FacetedNavigation.Item" data-facet-id="custitem1"></div>
			 -->

			<div class="facets-facet-browse-results">

				<header class="enhancedplp-facets-facet-browse-header">

					{{#if showItems}}

					<nav class="facets-facet-browse-list-header">

			<!--			<div class="facets-facet-browse-list-header-expander">
							<button class="facets-facet-browse-list-header-expander-button collapsed" data-toggle="collapse" data-target="#list-header-filters" aria-expanded="true" aria-controls="list-header-filters">
								{{translate 'Sort & Filter'}}
								<i class="facets-facet-browse-list-header-expander-icon"></i>
							</button>
						</div>

						<div class="facets-facet-browse-list-header-filters collapse" id="list-header-filters">
							<div class="facets-facet-browse-list-header-filters-wrapper">

								<div class="facets-facet-browse-list-header-filters-row">

									
								</div>

							</div>
						</div>
			-->
						<div class="facets-facet-browse-list-header-filter-column" data-view="Facets.ItemListSortSelector">
						</div>

						{{#if hasItemsAndFacets}}
							<div class="facets-facet-browse-list-header-filter-column">
								<button class="facets-facet-browse-list-header-filter-facets" data-type="sc-pusher" data-target="product-search-facets">
									{{translate 'Filter By'}}
									<i class="facets-facet-browse-list-header-filter-facets-icon"></i>
								</button>
							</div>
						{{/if}}
					</nav>
					{{/if}}
				</header>

				<meta itemprop="name" content="{{title}}"/>

				<div data-cms-area="facets_facet_browse_cms_area_1" data-cms-area-filters="page_type"></div>

				<div id="banner-section-top" class="content-banner banner-section-top" data-cms-area="item_list_banner_top" data-cms-area-filters="path"></div>

				{{#if showItems}}

					{{#if isEmptyList}}
						<div data-view="Facets.Items.Empty"></div>
					{{else}}
						<div class="facets-facet-browse-items" data-view="Facets.Items"></div>
					{{/if}}
				{{/if}}
			</div>

			<div class="facets-facet-browse-pagination" data-view="GlobalViews.Pagination"></div>
		</div>

		<div class="facets-facet-browse-cms-area-2" data-cms-area="facets_facet_browse_cms_area_2" data-cms-area-filters="page_type"></div>

	{{else}}
		<div class="facets-facet-browse-empty-items" data-view="Facets.Items.Empty"></div>
	{{/if}}

	<div id="banner-section-bottom" class="content-banner banner-section-bottom facets-facet-browse-banner-section-bottom" data-cms-area="item_list_banner_bottom" data-cms-area-filters="page_type"></div>
</section>



{{!----
Use the following context variables when customizing this template:

	total (Number)
	isTotalProductsOne (Boolean)
	title (String)
	hasItemsAndFacets (Boolean)
	collapseHeader (Boolean)
	keywords (undefined)
	showResults (Boolean)
	isEmptyList (Boolean)
	isCategory (Boolean)
	showItems (Number)

----}}
