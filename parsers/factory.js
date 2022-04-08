const Me = imports.misc.extensionUtils.getCurrentExtension()
const XML = Me.imports.rexml
const RSS = Me.imports.parsers.rss
const Atom = Me.imports.parsers.atom
const RDF = Me.imports.parsers.rdf
const FeedBurner = Me.imports.parsers.feedburner


function RSScreator(rawXML) {
    try {
        // Remove xml declaration.
        let cleanXml = rawXML.split(/<\?xml.*\?>/).join('')
        //Remove xml comments.
        cleanXml = cleanXml.split(/<!--[\s\S]*?-->/).join('')

        let xmlObj = new XML.REXML(cleanXml).rootElement

        test = 'rss'
        if (xmlObj.name.toLowerCase().slice(0, test.length) == test) {
            return new RSS.RssParser()
        }
        test = 'rdf:RDF'
        if (xmlObj.name.slice(0, test.length) == test) {
            return new RDF.RdfParser()
        }
        test = 'feed'
        if (xmlObj.name.toLowerCase().slice(0, test.length) == test) {
            return new Atom.AtomParser()
        }
        if (xmlObj.attribute('xmlns:feedburner') == 'http://rssnamespace.org/feedburner/ext/1.0') {
            return new FeedBurner.FeedBurnerParser()
        }
    } catch (error) {
        logError(error)
    }

}