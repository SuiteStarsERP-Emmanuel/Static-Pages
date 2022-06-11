<div class="home">

  <div class="home-banner-slider">
    {{#each banner}}
      <div class="home-banner-slide" style="background-image: url({{image}});">
        <div class="container">
          <h1>{{title}}</h1>
          <p>{{description}}</p>
          {{#if btnText}}
            <a href="{{href}}"
              class="button-primary button-large" {{objectToAtrributes
              this}}>{{btnText}}</a>
          {{/if}}
        </div>
      </div>
    {{/each}}
  </div>

  <div data-cms-area="home_cms_area_1" data-cms-area-filters="path"></div>

  <div class="ct-section no-spacing">
    <div class="container">
      <div class="row">
        {{#each blocks}}
          <div class="col-sm-6">
            <div class="ct-card" style="background-image: url({{image}});">
              <div class="ct-card-inner">
                <h4>{{title}}</h4>
                <p>{{description}}</p>
                {{#if btnText}}
                  <a href="{{href}}"
                    class="button-primary button-small" {{objectToAtrributes
                    this}}>{{btnText}}</a>
                {{/if}}
              </div>
            </div>
          </div>
        {{/each}}
      </div>
    </div>
  </div>

  <div data-cms-area="home_cms_area_2" data-cms-area-filters="path"></div>

  <section class="ct-section spacing-xl">
    <div class="container">
      <div data-view="NewInStock"></div>
    </div>
  </section>

  <div data-cms-area="home_cms_area_3" data-cms-area-filters="path"></div>

  <section class="ct-section spacing-xl ct-section-bs">
    <div class="container">
      <div data-view="BestSellers"></div>
    </div>
  </section>

  <div data-cms-area="home_cms_area_4" data-cms-area-filters="path"></div>

  <section class="ct-section spacing-xl">
    <div class="container">
      <div data-view="Sponsors"></div>
    </div>
  </section>
</div>

{{!----
Use the following context variables when customizing this template:

	imageHomeSize (String)
	imageHomeSizeBottom (String)
	carouselImages (Array)
	bottomBannerImages (Array)

----}}
