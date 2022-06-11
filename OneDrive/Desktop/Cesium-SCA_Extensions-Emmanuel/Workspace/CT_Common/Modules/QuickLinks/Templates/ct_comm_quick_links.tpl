<div class="quick-links-container">
  <div class="quick-links-list">
    {{#if quickLinks}}
      <ul>
        {{#each quickLinks}}
          <li class="quick-links-link">
            <a class="quick-links-link-name" {{objectToAtrributes
              this}}>{{name}}</a>
            <a title="{{translate 'Remove'}}" class="quick-links-link-remove"
              href="#" data-url={{url}}><i class="fa fa-times"
              aria-hidden="true"></i></a>
          </li>
        {{/each}}
      </ul>
    {{else}}
      <p>{{translate "No link found. Please add new one."}}</p>
    {{/if}}
  </div>
  <div class="quick-links-new">
    <h4 class="quick-links-new-title"> {{translate
      'Add Quick Link'}} </h4>
    <input class="quick-links-new-name"
      placeholder="{{translate 'Quick Link Name'}}" type="text"
      value="{{currentTitle}}">
    <input class="quick-links-new-url"
      placeholder="{{translate 'Hyperlink'}}"
      value="{{currentUrl}}" type="text">

    {{#if isExisting }}
      <p><small>{{translate 'This link is already existing.'}}</small></p>
    {{/if}}
    {{#if error }}
      <p><small>{{error}}</small></p>
    {{/if}}

    <button class="quick-links-new-button"
      data-action="new-quick-link" {{#if loading}}disabled{{/if}}>{{translate
      'Add'}}</button>
  </div>
</div>
