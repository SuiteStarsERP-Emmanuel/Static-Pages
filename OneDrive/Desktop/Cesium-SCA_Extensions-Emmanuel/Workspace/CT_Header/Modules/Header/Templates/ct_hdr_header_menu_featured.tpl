{{#if data }}
  <div class="header-menu-featured-inner">
    <ul>
      {{#each data}}
        <li>
          <img class="header-menu-featured-image" src="{{image}}" alt="" />
          {{#if links}}
            <ul class="header-menu-featured-links">
              {{#each links}}
                <li>
                  <a class="{{href}}" {{objectToAtrributes this}}>{{translate
                    text}}</a>
                </li>
              {{/each}}
            </ul>
          {{/if}}
        </li>
      {{/each}}
    </ul>
  </div>
{{/if}}