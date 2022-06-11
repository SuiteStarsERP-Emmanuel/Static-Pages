<div class="ct-collection">
  <h2 class="ct-collection-title">{{translate
    "Categories to meet your customers’ needs"}}</h2>
  <div class="ct-collection-items" data-type="carousel-items">
    {{#each items}}
      <div class="ct-cta ct-cta-circle">
        <a class="ct-cta-inner ct-has-arrow"
          href="{{href}}" {{objectToAtrributes this}}>
          <img src="{{image}}" alt="{{title}}" />
          <h5 class="ct-cta-caption">{{caption}}</h5>
          <h4 class="ct-cta-title">{{title}}</h4>
          <span class="ct-cta-icon">
            <span class="ct-icon-shaft"><span></span></span>
          </span>
        </a>
      </div>
    {{/each}}
  </div>
  <a class="ct-collection-button">{{translate "See Bestsellers"}}</a>
</div>
