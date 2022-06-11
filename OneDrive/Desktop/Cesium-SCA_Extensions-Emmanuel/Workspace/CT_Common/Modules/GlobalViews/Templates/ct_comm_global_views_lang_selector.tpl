{{#if showLanguageSelector}}
  <span class="global-views-lang-selector-addon">
    <i class="global-views-lang-selector-globe-icon"></i>
  </span>
  <select data-toggle="lang-selector"
    class="global-views-lang-selector-select">
    {{#each availableLanguages}}
      <option value="{{locale}}"
          {{#if isSelected}}selected{{/if}}>{{title}}</option>
    {{/each}}
  </select>
{{/if}}

{{!----
Use the following context variables when customizing this template:

  showLanguageSelector (Boolean)
  availableLanguages (Array)
  availableLanguages.title (String)
  availableLanguages.locale (String)
  availableLanguages.isSelected (Boolean)

----}}
