<div class="enhancedplp-facets-item-list-sort-container">
<label for="list-sort-selector" class="enhancedplp-facets-item-list-sort-by-text">{{translate 'Sort by: '}}</label>
	<select data-type="navigator" class="enhancedplp-facets-item-list-sort-selector" id="list-sort-selector">
		{{#each options}}
			<option value="{{configOptionUrl}}" class="{{className}}" {{#if isSelected}} selected="" {{/if}} >{{translate '$(0)' name}}</option>
		{{/each}}
	</select>
<div>



{{!----
Use the following context variables when customizing this template: 
	
	options (Array)

----}}
