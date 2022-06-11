{{#unless isStandalone}}
  <nav class="header-menu-secondary-nav">
    <ul class="header-menu-level1">
      {{#each categories}}
        {{#unless hide}}
          <li {{#if categories}}data-toggle="categories-menu"{{/if}} {{#if
            hasLevel3}}class="header-menu-has-level3"{{/if}} {{#if
            isQuickLinksAnchor}}data-toggle="quick-links"{{/if}}>
            <a class="{{class}}" {{objectToAtrributes this}}>{{#if icon}}
              <span class="{{icon}}"></span>{{else }}
              <span class="header-menu-level-text"
                data-text="{{translate text}}">{{translate
                text}}</span>{{/if}}
            </a>

            {{#if isQuickLinksAnchor}}
              <div data-view="Header.Menu.QuickLinks"></div>
            {{/if}}

            {{#if categories}}
              <div class="header-menu-level-container">
                <div class="header-menu-level-inner">
                  <ul class="header-menu-level2"
                    data-columns="{{#if columns}}{{columns}}{{else}}1{{/if}}">
                    {{#each categories}}
                      <li>
                        <a class="{{class}}{{#if
                          hasChildren}} header-menu-anchor-has-children{{/if}}" {{objectToAtrributes
                          this}}><span
                          class="header-menu-level-text"
                          data-text="{{translate text}}">{{translate
                          text}}</span></a>
                      </li>
                    {{/each}}
                  </ul>
                  {{#if hasLevel3 }}
                    <div class="header-menu-level2-children">
                      {{#each categories}}
                        {{#if categories}}
                          <ul class="header-menu-level3" data-id="{{id}}"
                            data-columns="{{#if
                              columns}}{{columns}}{{else}}1{{/if}}">
                            {{#each categories}}
                              <li {{#if
                                shopAll}}class="header-menu-item-shop-all"{{/if}}>
                                <a class="{{class}}" {{objectToAtrributes
                                  this}}><span
                                  class="header-menu-level-text"
                                  data-text="{{translate text}}">{{translate
                                  text}}</span></a>
                              </li>
                            {{/each}}
                          </ul>
                        {{/if}}
                      {{/each}}
                    </div>
                  {{/if}}
                  <div data-view="Header.Menu.Featured"
                    class="header-menu-featured"></div>
                </div>
              </div>
            {{/if}}
          </li>
        {{/unless}}
      {{/each}}
    </ul>
  </nav>
{{/unless}}

{{!----
Use the following context variables when customizing this template:

	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}
