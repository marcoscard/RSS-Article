const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const GLib = imports.gi.GLib
const Parser = Me.imports.parsers.factory
const ByteArray = imports.byteArray

let xmlText = GLib.file_get_contents( Me.dir.get_path() + '/test.xml' )[1]
if (xmlText instanceof Uint8Array) xmlText = ByteArray.toString(xmlText)
let myPopup


const MyPopup = GObject.registerClass(
    class MyPopup extends PanelMenu.Button {

        _init() {

            super._init(1)

            let icon = new St.Icon({
                gicon: Gio.icon_new_for_string(Me.dir.get_path() + '/icon.svg'),
                style_class: 'system-status-icon'
            })

            this.add_child(icon)
            let pmItem = new PopupMenu.PopupMenuItem('Test')
            this.menu.addMenuItem(pmItem)

            pmItem.connect('activate', () => {
                let xmlParsed = Parser.RSScreator(xmlText)
            })




        }

    }
)

function enable() {
    myPopup = new MyPopup()
    Main.panel.addToStatusArea('myPopup', myPopup, 1)
}

function disable() {
    myPopup.destroy()
}

