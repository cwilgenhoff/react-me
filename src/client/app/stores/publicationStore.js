import Reflux from 'reflux';
import PublicationActions from '../actions/publicationActions';

var PublicationStore = Reflux.createStore({

    init() {
        this.publications = [];

        this.listenTo(PublicationActions.loadPublications, this.loadPublications);
        this.listenTo(PublicationActions.loadPublicationsSuccess, this.loadPublicationsSuccess);
        this.listenTo(PublicationActions.loadPublicationsError, this.loadPublicationsError);
    },

    loadPublications() {
        this.trigger({
            loading: true
        });
    },

    loadPublicationsSuccess(publications) {
        this.publications = publications;

        this.trigger({
            publications : this.publications
        });
    },

    loadPublicationsError(error) {
        this.trigger({
            error : error
        });
    }

});

export default PublicationStore;
