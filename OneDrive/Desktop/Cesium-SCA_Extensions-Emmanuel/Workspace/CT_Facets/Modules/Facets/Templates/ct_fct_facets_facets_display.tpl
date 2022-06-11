

<div>
<span class="facets-facets-display-narrowedby-title">{{translate 'Filter By'}}</span>
{{#if hasFacets}}
	<div class="facets-facets-display-clear-wrapper">
		<a href="{{clearAllFacetsLink}}" class="facets-facets-display-clear">
			<span>{{translate 'Clear All'}}</span>
		</a>
	</div>
	</div>

	<div>
	{{#each values}}
		<a class="facets-facets-display-filter" data-type="facet-selected" data-facet-id="{{facetValue}}" href="{{facetValueUrl}}">
			<span>
				{{#if facetValueIsObject}}
					{{translate '$(0) to $(1)' from to}}
				{{else}}
					{{valueLabel}}
				{{/if}}
			</span>
			<i class="facets-facets-display-filter-delete-icon" title="{{translate 'Clear filter'}}"></i>
		</a>
	{{/each}}
	</div>
{{/if}}
</div>



{{!----
Use the following context variables when customizing this template:

	hasFacets (Boolean)
	clearAllFacetsLink (String)
	values (Array)

----}}
