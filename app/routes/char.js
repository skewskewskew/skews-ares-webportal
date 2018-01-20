import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    ajax: service(),
    
    afterModel: function(model) { 
        if (model.get('char.playerbit')) {
            this.transitionTo('player', model.get('char.id'));
        }
    },
    
    model: function(params) {
        let aj = this.get('ajax');
        return RSVP.hash({
            char: aj.queryOne('character', { id: params['id'] }),
            game: this.modelFor('application').game,
            sceneTypes: aj.queryMany('sceneTypes') })
            .then((model) => Ember.Object.create(model));
    },
    
    titleToken: function(model) {
        return model.name;
    }
});
