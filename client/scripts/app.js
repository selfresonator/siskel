var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    if (this.get('like') === true) {
      this.set('like',false);
    } else {
      this.set('like', true);
    }
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here

  },

  comparator: 'title',
  sortByField: function(field) {
    if (field === this.comparator){
          this.sort(this.get('comparator'));
        } else {
          this.comparator = field;
          //this.set('comparator', field);
          // console.log('this.comparator',this.comparator)
          //console.log('comparator', this.get('comparator'));
          this.sort(this.get('comparator'));
        }  },

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
