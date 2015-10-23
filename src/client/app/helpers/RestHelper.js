import $ from 'jquery';

class RestHelper {

    get(url){
        return new Promise(function(success, error){
            $.ajax({
                url: url,
                dataType: "json",
                success,
                error
            });
        });
    }
}

export default new RestHelper();
