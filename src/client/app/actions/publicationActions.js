import Reflux from 'reflux';
import RestHelper from '../helpers/RestHelper';

var PublicationActions = Reflux.createActions([
    'loadPublications',
    'loadPublicationsSuccess',
    'loadPublicationsError'
]);

PublicationActions.loadPublications.preEmit = function(){

    RestHelper.get('/api/publications')
        .then(function (publications) {
            PublicationActions.loadPublicationsSuccess(publications);
        })
        .catch(function (error) {
            PublicationActions.loadPublicationsError(error);
        })

};

export default PublicationActions;
