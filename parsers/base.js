const Me = imports.misc.extensionUtils.getCurrentExtension()
const GObject = imports.gi.GObject


const BaseParser = GObject.registerClass(
    class BaseParser extends GObject.Object {

        static Items = []

        static Publisher = {
            Title: '',
            Link: '',
            Description: '',
            PublishDate: ''
        }


        _init(root) {
            this._root = root
        }


        _initItem() {
            let item = {
                Title: '',
                HttpLink: '',
                Description: '',
                Author: '',
                ImgLink: '',
                PublishDate: ''
            }
            return item
        }


        clear() {
            // Clear publisher and items 
            this.Publisher.Title = ''
            this.Publisher.HttpLink = ''
            this.Publisher.Description = ''
            this.Publisher.PublishDate = ''
            while (this.Items.length > 0) {
                this.Items.pop()
            }
        }


        parse() {
            // Parse feed
        }


        _parsePublisher() {
    
        }


        _parseItem() {
            
        }


    })