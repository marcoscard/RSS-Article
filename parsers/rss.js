const Me = imports.misc.extensionUtils.getCurrentExtension()
const GObject = imports.gi.GObject
const Base = Me.imports.parsers.base

const RssParser = GObject.registerClass(
    class RssParser extends Base.BaseParser {

        _init(root) {
            super._init(root)
            log("RSS 2.0 Parser")
        }

        // Parse feed file
        parse() {
            this._parsePublisher(this._root.childElements[0].childElements)
        }


        _parsePublisher(childElements) {

            for (let index = 0; index < childElements.length; index++) {
                if (childElements[index].name == 'title') {
                    this.Publisher.Title = childElements[index].text
                } else if (childElements[index].name == 'link') {
                    this.Publisher.Link = childElements[index].text
                } else if (childElements[index].name == 'description') {
                    this.Publisher.Description = childElements[index].text
                } else if (childElements[index].name == 'pubDate') {
                    this.Publisher.PublishDate = childElements[index].text
                } else if (childElements[index].name == 'item') {
                    this._parseItem(childElements[index].childElements)
                }
            }
        }


        _parseItem(itemElements) {
            let item = this._initItem()

            for (let index = 0; index < itemElements.length; index++) {

                if (itemElements[index].name == 'title') {
                    item.Title = itemElements[index].text
                } else if (itemElements[index].name == 'link') {
                    item.HttpLink = itemElements[index].text
                } else if (itemElements[index].name == 'description') {
                    item.Description = itemElements[index].text
                } else if (itemElements[index].name == 'author') {
                    item.Author = itemElements[index].text
                } else if (itemElements[index].name == 'enclosure') {
                    item.ImgLink = itemElements[index].attributes.url
                } else if (itemElements[index].name == 'pubDate') {
                    item.PublishDate = itemElements[index].text
                }
            }
            this.Items.push(item)
        }

    })