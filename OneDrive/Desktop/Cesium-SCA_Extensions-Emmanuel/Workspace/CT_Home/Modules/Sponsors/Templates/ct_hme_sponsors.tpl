<div class="ct-collection">
  <h2 class="ct-collection-title">{{translate
    "Premium Brands, Premium Products"}}</h2>
  <div class="ct-collection-items" data-type="carousel-items">
    {{#each items}}
      <a href={{href}} {{objectToAtrributes this}}>
        <img class="home-sponsor-image" src={{image}} alt="">
      </a>
    {{/each}}
  </div>
  <a class="ct-collection-button-secondary">{{translate "See all brands"}}</a>
</div>