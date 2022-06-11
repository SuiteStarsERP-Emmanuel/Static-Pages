<div class="header-sidebar-wrapper">
  <div class="header-sidebar-menu-wrapper" data-type="header-sidebar-menu">
    <ul class="header-sidebar-menu">
      {{#unless isStandalone}}
        {{#each categories}}
          {{#if text}}
            <li>
              <a {{objectToAtrributes this}} class="ct-has-arrow" {{#if
                categories}}data-action="push-menu"{{/if}} {{#if
                isQuickLinksAnchor}}data-toggle="quick-links"{{/if}}
                name="{{text}}">
                {{translate text}}
                {{#if icon}}<i class="{{icon}}"></i>{{/if}}
                {{#if categories}}
                  <span class="ct-icon-shaft"><span></span></span>{{/if}}
              </a>

              {{#if isQuickLinksAnchor}}
                <div data-view="Header.Menu.QuickLinks"></div>
              {{/if}}

              {{#if categories}}
                <ul>
                  <li class="header-sidebar-menu-item-back">
                    <a href="#"
                      class="header-sidebar-menu-back ct-has-arrow-reverted"
                      data-action="pop-menu" name="back-sidebar">
                      <span class="ct-icon-shaft"><span></span></span>
                      {{translate 'Back'}}
                    </a>
                  </li>

                  {{#each categories}}
                    <li>
                      <a {{objectToAtrributes this}} {{#if
                        categories}}data-action="toggle-menu"{{/if}}>
                        {{text}}
                        {{#if categories}}
                          <i class="header-sidebar-menu-push-icon"></i>{{/if}}
                      </a>

                      {{#if categories}}
                        <ul>
                          {{#each categories}}
                            <li>
                              <a {{objectToAtrributes this}}
                                name="{{text}}">{{text}}</a>
                            </li>
                          {{/each}}
                        </ul>
                      {{/if}}
                    </li>
                  {{/each}}
                </ul>
              {{/if}}
            </li>
          {{/if}}
        {{/each}}
      {{/unless}}

      {{#if showExtendedMenu}}
        <li class="header-sidebar-menu-myaccount"
          data-view="Header.Menu.MyAccount"></li>
      {{/if}}
      {{#unless isStandalone}}
        <li data-view="QuickOrderHeaderLink"></li>
        <li data-view="RequestQuoteWizardHeaderLink"></li>
      {{/unless}}
    </ul>
  </div>

  <div class="header-sidebar-bottom">
    <div class="header-sidebar-settings">
      <a href="#" class="header-subheader-settings-link"
        data-toggle="dropdown"
        title="{{translate 'Settings'}}">
        {{translate labelLanguagesOrCurrencies}}
        <i class="header-menu-settings-carret"></i>
      </a>
      <div class="header-menu-settings-dropdown">
        {{#if showLanguages}}
          <div data-view="Global.LangSelector"></div>
        {{/if}}
        {{#if showCurrencies}}
          <div data-view="Global.CurrencySelector"></div>
        {{/if}}
      </div>
    </div>

    {{#if showExtendedMenu}}
      <a class="header-sidebar-user-logout" href="#" data-touchpoint="logout">
        <i class="header-sidebar-user-logout-icon"></i>&nbsp;{{translate
        'Sign Out'}}
      </a>
    {{/if}}
  </div>
</div>



{{!----
Use the following context variables when customizing this template:

	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}
