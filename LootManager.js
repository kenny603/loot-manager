// Author: Ken Benoit
// Last updated: 2020-09-15

var LootManager = LootManager || {};

LootManager.script_name    = "LootManager";
LootManager.version        = 0.3;
LootManager.last_update    = 1600172001;
LootManager.schema_version = 0.2;

LootManager.generateUUID = (function() {
    "use strict";

    var a = 0, b = [];
    return function() {
        var c = (new Date()).getTime() + 0, d = c === a;
        a = c;
        for (var e = new Array(8), f = 7; 0 <= f; f--) {
            e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
            c = Math.floor(c / 64);
        }
        c = e.join("");
        if (d) {
            for (f = 11; 0 <= f && 63 === b[f]; f--) {
                b[f] = 0;
            }
            b[f]++;
        } else {
            for (f = 0; 12 > f; f++) {
                b[f] = Math.floor(64 * Math.random());
            }
        }
        for (f = 0; 12 > f; f++){
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        }
        return c;
    };
}()); // end generateUUID

LootManager.generateRowID = function () {
    "use strict";
    return LootManager.generateUUID().replace(/_/g, "Z");
}; // end generateRowID

LootManager.class = {
    InventoryItemClass: class InventoryItem {
        constructor () {
            this._generic_tags = {
                name: {
                    mapped_definition_key: '',
                    default: 'Default Item'
                },
                system_type: {
                    mapped_definition_key: '',
                    default: ''
                },
                quantity: {
                    mapped_definition_key: '',
                    default: 1
                },
                character_id: {
                    mapped_definition_key: '',
                    default: ''
                }
            };
            this._offer_display = '';
            this._definition_store = {};
        } // end constructor

        setDefinition(key, value, tag = '') {
            var self = this;
            self._definition_store[key] = value;
            if (tag !== '' && _.has(self._generic_tags, tag)) {
                self._generic_tags[tag]['mapped_definition_key'] = key;
            }
        } // end setDefinition

        getDefinition(key) {
            return this._definition_store[key];
        } // end getDefinition

        _getTaggedValue(tag) {
            var tag_value;
            if (this._generic_tags[tag]['mapped_definition_key'] === '') {
                tag_value = this._generic_tags[tag]['default'];
            }
            else {
                tag_value = this._definition_store[this._generic_tags[tag]['mapped_definition_key']];
            }
            return tag_value;
        } // end _getTaggedValue

        _setTaggedValue(tag, value) {
            if (this._generic_tags[tag]['mapped_definition_key'] === '') {
                log(`Unable to assign ${value} to tag ${tag} without an associated definition`);
                return;
            }

            this._definition_store[this._generic_tags[tag]['mapped_definition_key']] = value;
        } // end _setTaggedValue

        getName() {
            return this._getTaggedValue('name');
        } // end getName

        getSystemType() {
            return this._getTaggedValue('system_type');
        } // end getSystemType

        getQuantity() {
            return this._getTaggedValue('quantity');
        } // end getQuantity

        getCharacterID() {
            return this._getTaggedValue('character_id');
        } // end getCharacterID

        setName(name) {
            this._setTaggedValue('name', name);
        } // end setName

        setSystemType(system_type) {
            this._setTaggedValue('system_type', system_type);
        } // end setSystemType

        setQuantity(quantity) {
            this._setTaggedValue('quantity', parseInt(quantity));
        } // end setQuantity

        getOfferDisplay() {
            return this._offer_display;
        } // end getOfferDisplay

        setOfferDisplay(display_string) {
            this._offer_display = display_string;
        } // end setOfferDisplay

        copyInstance() {
            var self = this;
            var copied = new InventoryItem();

            copied._offer_display = self._offer_display;

            _.each(self._generic_tags, function (tag_def, tag_name) {
                copied._generic_tags[tag_name] = {
                    mapped_definition_key: tag_def['mapped_definition_key'],
                    default: tag_def['default']
                };
            });

            _.each(self._definition_store, function (def_value, def_name) {
                copied._definition_store[def_name] = def_value;
            });

            return copied;
        } // end copyInstance

        // It is important to run this method to push the data in the Roll20
        // state variable since it cannot store complex objects. This method
        // will serialize the data into a simple JavaScript object for
        // storage in state.
        serialize() {
            var serialized_data = {};
            serialized_data['_generic_tags'] = this._generic_tags;
            serialized_data['_offer_display'] = this._offer_display;
            serialized_data['_definition_store'] = this._definition_store;

            return serialized_data;
        } // end serialize

        // Use this method when pulling information out of the Roll20 state
        // variable for a particular item. This method will create a new
        // InventoryItem object and load all the data from state into it,
        // creating a fully functional InventoryItem instance.
        static deserialize(serialized_data) {
            var inventory_item = new InventoryItem();

            inventory_item._generic_tags = serialized_data['_generic_tags'];
            inventory_item._offer_display = serialized_data['_offer_display'];
            inventory_item._definition_store = serialized_data['_definition_store'];

            return inventory_item;
        } // end deserialize
    }, // end InventoryItem
    CurrencyClass: class Currency {
        constructor(whole_only = false) {
            this._generic_tags = {
                system_type: {
                    mapped_definition_key: '',
                    default: ''
                },
                quantity: {
                    mapped_definition_key: '',
                    default: 0
                },
                singular: {
                    mapped_definition_key: '',
                    default: 'Money'
                },
                plural: {
                    mapped_definition_key: '',
                    default: 'Money'
                },
                character_id: {
                    mapped_definition_key: '',
                    default: ''
                }
            };
            this._whole = whole_only;
            this._offer_display = '';
            this._definition_store = {};

        } // end constructor

        setDefinition(key, value, tag = '') {
            var self = this;
            self._definition_store[key] = value;
            if (tag !== '' && _.has(self._generic_tags, tag)) {
                self._generic_tags[tag]['mapped_definition_key'] = key;
            }
        } // end setDefinition

        getDefinition(key) {
            return this._definition_store[key];
        } // end getDefinition

        _getTaggedValue(tag) {
            var tag_value;
            if (this._generic_tags[tag]['mapped_definition_key'] === '') {
                tag_value = this._generic_tags[tag]['default'];
            }
            else {
                tag_value = this._definition_store[this._generic_tags[tag]['mapped_definition_key']];
            }
            return tag_value;
        } // end _getTaggedValue

        _setTaggedValue(tag, value) {
            if (this._generic_tags[tag]['mapped_definition_key'] === '') {
                log(`Unable to assign ${value} to tag ${tag} without an associated definition`);
                return;
            }

            this._definition_store[this._generic_tags[tag]['mapped_definition_key']] = value;
        } // end _setTaggedValue

        getSystemType() {
            return this._getTaggedValue('system_type');
        } // end getSystemType

        getQuantity() {
            return this._getTaggedValue('quantity');
        } // end getQuantity

        getCharacterID() {
            return this._getTaggedValue('character_id');
        } // end getCharacterID

        setSystemType(system_type) {
            this._setTaggedValue('system_type', system_type);
        } // end setSystemType

        setQuantity(quantity) {
            if (this._whole) {
                quantity = parseInt(quantity);
            }
            else {
                quantity = Number(quantity);
            }
            this._setTaggedValue('quantity', quantity);
        } // end setQuantity

        _matchesType(currency) {
            if (currency.getUnit() === this.getUnit() && currency.getUnit(true) === this.getUnit(true) && currency._whole === this._whole) {
                return true;
            }
            return false;
        } // end _matchesType

        toString() {
            var currency_name = this.getDefinition('plural');
            var quantity_string = this.getQuantity().toString();
            if (this.getQuantity() === 1) {
                currency_name = this.getDefinition('singular');
            }

            return `${quantity_string} ${currency_name}`;
        } // end toString

        getName() {
            return this.getUnit(true);
        } // end getName

        getUnit(plural = false) {
            if (plural) {
                return this.getDefinition('plural');
            }
            return this.getDefinition('singular');
        } // end getUnit

        add(currency) {
            if (!(currency instanceof Currency)) {
                var currency_value = currency;
                currency = new Currency(this._whole);
                currency.setDefinition('quantity', currency_value, 'quantity');
                currency.setDefinition('singular', this.getUnit(), 'singular');
                currency.setDefinition('plural', this.getUnit(true), 'plural');
            }
            if (!this._matchesType(currency)) {
                log("ERROR: Cannot add different types of Currency objects together");
                return false;
            }

            this.setQuantity(Number(this.getQuantity()) + Number(currency.getQuantity()));
        } // end add

        subtract(currency) {
            if (!(currency instanceof Currency)) {
                var currency_value = currency;
                currency = new Currency(this._whole);
                currency.setDefinition('quantity', currency_value, 'quantity');
                currency.setDefinition('singular', this.getUnit(), 'singular');
                currency.setDefinition('plural', this.getUnit(true), 'plural');
            }
            if (!this._matchesType(currency)) {
                log("ERROR: Cannot subtract different types of Currency objects from each other");
                return false;
            }
            if (currency.getQuantity() > this.getQuantity()) {
                var base_currency = this.toString();
                var mod_currency = currency.toString();
                log(`ERROR: Subtracting ${mod_currency} from ${base_currency} would result in a negative value`);
                return false;
            }

            this.setQuantity(Number(this.getQuantity()) - Number(currency.getQuantity()));
        } // end subtract

        equals(currency) {
            if (!(currency instanceof Currency)) {
                var currency_value = currency;
                currency = new Currency(this._whole);
                currency.setDefinition('quantity', currency_value, 'quantity');
                currency.setDefinition('singular', this.getUnit(), 'singular');
                currency.setDefinition('plural', this.getUnit(true), 'plural');
            }
            if (!this._matchesType(currency)) {
                log("ERROR: Cannot compare different types of Currency objects from each other");
                return false;
            }
            if (currency.getQuantity() !== this.getQuantity()) {
                return false;
            }
            return true;
        } // end equals

        getOfferDisplay() {
            return this._offer_display;
        } // end getOfferDisplay

        setOfferDisplay(display_string) {
            this._offer_display = display_string;
        } // end setOfferDisplay

        copyInstance() {
            var self = this;
            var copied = new Currency();

            copied._offer_display = self._offer_display;
            copied._whole = self._whole;

            _.each(self._generic_tags, function (tag_def, tag_name) {
                copied._generic_tags[tag_name] = {
                    mapped_definition_key: tag_def['mapped_definition_key'],
                    default: tag_def['default']
                };
            });

            _.each(self._definition_store, function (def_value, def_name) {
                copied._definition_store[def_name] = def_value;
            });

            return copied;
        } // end copyInstance

        // It is important to run this method to push the data in the Roll20
        // state variable since it cannot store complex objects. This method
        // will serialize the data into a simple JavaScript object for
        // storage in state.
        serialize() {
            var serialized_data = {};
            serialized_data['_generic_tags'] = this._generic_tags;
            serialized_data['_whole'] = this._whole;
            serialized_data['_offer_display'] = this._offer_display;
            serialized_data['_definition_store'] = this._definition_store;

            return serialized_data;
        } // end serialize

        // Use this method when pulling information out of the Roll20 state
        // variable for a particular item. This method will create a new
        // Currency object and load all the data from state into it, creating a 
        // fully functional Currency instance.
        static deserialize(serialized_data) {
            var currency_object = new Currency();

            currency_object._generic_tags = serialized_data['_generic_tags'];
            currency_object._whole = serialized_data['_whole'];
            currency_object._offer_display = serialized_data['_offer_display'];
            currency_object._definition_store = serialized_data['_definition_store'];

            return currency_object;
        } // end deserialize
    }, // end Currency
    InventoryTranslatorClass: class InventoryTranslator {
        // InventoryTranslator is meant to be an abstract class that you create
        // other translators from for whatever RPG system you need.
        constructor() {
            if (new.target === InventoryTranslator) {
                log("Cannot construct InventoryParser instances directly");
                return;
            }
        } // end constructor

        // This method is to be used to read items and currencies in from the 
        // inventory of a specific character sheet. It must return these items
        // and currencies in a list, and they must be of InventoryItem or
        // Currency type.
        read(character_id) {
            log("read must be overridden");
            return;
        } // end read

        // This method is to be used to write InventoryItem and/or Currency
        // objects into a specific character sheet. The items parameter can be
        // either a singular InventoryItem or Currency object, or a list of
        // objects. It returns nothing.
        write(character_id, items) {
            log("write must be overridden");
            return;
        } // end write

        // This method is to be used to update InventoryItem and/or Currency
        // objects that are already present in a character sheet. The items
        // parameter can be either a singular InventoryItem or Currency object,
        // or a list of objects. The InventoryItem or Currency objects should
        // already be associated with a character sheet, hence the lack of
        // character_id supplied. It returns nothing.
        update(items) {
            log("update must be overridden");
            return;
        } // end update

        // This method is to be used to delete InventoryItem and/or Currency
        // objects that are already present in a character sheet. The items
        // parameter can be either a singular InventoryItem or Currency object,
        // or a list of objects. The InventoryItem or Currency objects should
        // already be associated with a character sheet, hence the lack of
        // character_id supplied. It returns nothing.
        delete(items) {
            log("delete must be overridden");
            return;
        } // end delete

        // This method is to be used to take in a currency string (in the form 
        // of "<quantity> <unit>") and either returns a Currency object or
        // undefined if it is unable to interpret the provided string.
        convertToCurrency(currency_string) {
            log("convertToCurrency must be overridden");
            return;
        } // end convertToCurrency

        // This method is to be used to take in a character ID and a list of
        // Currency objects for the purpose of providing a list of Currency
        // objects that the character possesses that would be equivalent to the
        // list of Currency objects provided. It should return a list of
        // Currency objects, or undefined if there is no equivalent Currency
        // possible.
        // The idea here is to be able to convert prices if needed, such as when 
        // a character is buying an item priced at 1 platinum, but they only 
        // have 10 gold (to put it in terms of Pathfinder or D&D).
        getEquivalentCurrency(character_id, list_of_currencies) {
            // If not overridden, simply return undefined, which will indicate
            // that currencies are non-translateable between denominations
            return undefined;
        } // end getEquivalentCurrency
    }, // end InventoryTranslator
    OfferClass: class Offer {
        constructor(item, offer_targets = [], price) {
            var self = this;
            if (!(item instanceof LootManager.class.InventoryItemClass) && !(item instanceof LootManager.class.CurrencyClass)) {
                var error_message = 'Offer needs to be created with an InventoryItem';
                log(`ERROR: ${error_message}`);
                throw new TypeError(error_message);
            }
            if(price !== undefined) {
                if (!Array.isArray(price)) {
                    price = [price];
                }

                _.each(price, function (currency_obj) {
                    if (!(currency_obj instanceof LootManager.class.CurrencyClass)) {
                        var error_message = 'Offer price must be a list of Currency objects if provided';
                        log(`ERROR: ${error_message}`);
                        throw new TypeError(error_message);
                    }
                });

            }
            if (!Array.isArray(offer_targets)) {
                offer_targets = [offer_targets];
            }
            self._item = item;
            self._starting_quantity = item.getQuantity();
            self._offer_targets = []; // This is a list of objects containing
                                      // if they are a player or character ID,
                                      // as well as the ID. If this list is
                                      // empty, then that indicates the offer is
                                      // available to everyone, otherwise we
                                      // limit the visibility of the offer to
                                      // specific characters or players.
            self._price = price; // Price that must be paid to receive the item
                                 // being offered. If no price is provided then
                                 // we assume it is free. One thing to keep in
                                 // mind is price is a list of Currency objects,
                                 // not a plain number, because currency types
                                 // are different between game systems.
            self._history = []; // A list of strings. Each string should contain
                                // a piece of history about the Offer, such as:
                                // when and who created the offer; when the
                                // offer was claimed and who claimed it; when
                                // the offer was recalled; etc.
            self._hidden = false; // Indicates whether an offer should be
                                  // hidden from players.
            self._id = LootManager.generateUUID();

            _.each(offer_targets, function (target) {
                var target_obj = self._findCharacterOrPlayerID(target);

                if (target_obj !== undefined) {
                    self._offer_targets.push(target_obj);
                }
            });

            self._addToHistory(getObj('character', self._item.getCharacterID()), 'created');
        } // end constructor

        getID() {
            return this._id;
        } // end getID

        getItem() {
            return this._item;
        } // end getItem

        getPrice() {
            return this._price;
        } // end getPrice

        getStartingQuantity() {
            return this._starting_quantity;
        } // end getStartingQuantity

        getTargetIDs(player_ids = true, character_ids = true) {
            var self = this;
            var ids = [];

            if (player_ids) {
                ids = ids.concat(_.chain(self._offer_targets).where({type: 'player'}).pluck('id').value());
            }
            if (character_ids) {
                ids = ids.concat(_.chain(self._offer_targets).where({type: 'character'}).pluck('id').value());
            }

            return ids;
        } // end getTargetIDs

        isVisibleTo(character) {
            var self = this;
            var character_id = character.get('id');
            var player_ids = character.get('controlledby').split(',');

            // If the offer is hidden then it should absolutely not be visible
            // to the character
            if (self.isHidden()) {
                return false;
            }

            // If the character is the character that offered the item, then we
            // default to always making the offer visible to them, even if they
            // are not a target
            if (self._item.getCharacterID() === character_id) {
                return true;
            }

            // If we don't have any offer targets, then it should be visible to
            // everyone
            if (self._offer_targets.length === 0) {
                return true;
            }

            // Check to see if the character ID is one of the approved offer
            // targets
            if (_.contains(self.getTargetIDs(false, true), character_id)) {
                return true;
            }

            // Check to see if the player ID is one of the approved offer
            // targets
            if (_.intersection(self.getTargetIDs(true, false), player_ids).length === 1) {
                return true;
            }

            return false;
        } // end isVisibleTo

        isHidden() {
            return this._hidden;
        } // end isHidden

        hide() {
            this._hidden = true;
        } // end hide

        unhide() {
            this._hidden = false;
        } // end unhide

        claimedBy(character, amount) {
            if (amount) {
                amount = `Quantity claimed: ${amount}`;
            }
            this._addToHistory(character, 'claimed', amount);
        } // end claimedBy

        recalled() {
            var character = getObj('character', this._item.getCharacterID());
            this._addToHistory(character, 'recalled');
        } // end recalled

        droppedBy(character) {
            this._addToHistory(character, 'dropped');
        } // end droppedBy

        getHistory() {
            return this._history;
        } // end getHistory

        _addToHistory(character, action, appender = '') {
            var date = new Date();
            this._history.push(`${date.toUTCString()} -- ${character.get('name')} (${character.get('id')}) ${action} offer (${appender})`);
        } // end _addToHistory

        // Helper method to search for a matching player ID or character ID.
        _findCharacterOrPlayerID(search_string) {
            var temp_object;

            // Try loading based on character ID
            temp_object = getObj('character', search_string);
            if (temp_object) {
                return {type: 'character', id: search_string};
            }

            // Try loading based on player ID
            temp_object = getObj('player', search_string);
            if (temp_object) {
                return {type: 'player', id: search_string};
            }

            // Try loading indirectly from the token ID
            temp_object = getObj('graphic', search_string);
            if (temp_object) {
                var graphic_related_object = getObj('character', temp_object.get('represents'));
                if (graphic_related_object) {
                    return {type: 'character', id: graphic_related_object.get('id')};
                }

                graphic_related_object = getObj('player', temp_object.get('controlledby'));
                if (graphic_related_object) {
                    return {type: 'player', id: graphic_related_object.get('id')};
                }
            }

            // Try an exact match through character name
            temp_object = findObjs({
                type: 'character',
                name: search_string
            });
            if (temp_object.length === 1) {
                return {type: 'character', id: temp_object[0].get('id')};
            }

            // Try an exact match through player display name
            temp_object = findObjs({
                type: 'player',
                _displayname: search_string
            });
            if (temp_object.length === 1) {
                return {type: 'player', id: temp_object[0].get('id')};
            }

            // Try an exact match through player User ID
            temp_object = findObjs({
                type: 'player',
                _d20userid: search_string
            });
            if (temp_object.length === 1) {
                return {type: 'player', id: temp_object[0].get('id')};
            }

            // Try loading through a fuzzy character name match
            temp_object = filterObjs(function (obj) {
                var replaced_search = search_string.replace(/\s+/g, '\\s+');
                var name_regex = new RegExp(replaced_search, 'i');
                if (obj.get('type') === 'character' && obj.get('name') !== undefined && obj.get('name').match(name_regex)) {
                    return true;
                }
                return false;
            });
            if (temp_object.length === 1) {
                return {type: 'character', id: temp_object[0].get('id')};
            }

            // Try loading through a fuzzy player display name match
            temp_object = filterObjs(function (obj) {
                var replaced_search = search_string.replace(/\s+/g, '\\s+');
                var name_regex = new RegExp(replaced_search, 'i');
                if (obj.get('type') === 'player' && obj.get('name') !== undefined && obj.get('_displayname').match(name_regex)) {
                    return true;
                }
                return false;
            });
            if (temp_object.length === 1) {
                return {type: 'player', id: temp_object[0].get('id')};
            }

            return undefined;
        } // end findCharacterOrPlayerID

        // It is important to run this method to push the data in the Roll20
        // state variable since it cannot store complex objects. This method
        // will serialize the data into a simple JavaScript object for
        // storage in state.
        serialize() {
            var self = this;
            var serialized_data = {};
            serialized_data['_item'] = self._item.serialize();
            if (self._item instanceof LootManager.class.InventoryItemClass) {
                serialized_data['_item_type'] = 'InventoryItem';
            }
            else if (self._item instanceof LootManager.class.CurrencyClass) {
                serialized_data['_item_type'] = 'Currency';
            }
            serialized_data['_starting_quantity'] = self._starting_quantity;
            serialized_data['_offer_targets'] = self._offer_targets;
            serialized_data['_price'] = [];
            if (self._price !== undefined) {
                if (Array.isArray(self._price) && self._price.length > 0) {
                    _.each(self._price, function (currency_obj) {
                        serialized_data['_price'].push(currency_obj.serialize());
                    });
                }
            }
            serialized_data['_history'] = self._history;
            serialized_data['_hidden'] = self._hidden;
            serialized_data['_id'] = self._id;

            return serialized_data;
        } // end serialize

        // Use this method when pulling information out of the Roll20 state
        // variable for a particular offer. This method will create a new
        // Offer object and load all the data from state into it, creating a
        // fully functional Offer instance, including the InventoryItem or
        // Currency stored within it.
        static deserialize(serialized_data) {
            var offer_object;
            var item;
            var price = [];

            if (serialized_data['_item_type'] === 'InventoryItem') {
                item = LootManager.class.InventoryItemClass.deserialize(serialized_data['_item']);
            }
            else if (serialized_data['_item_type'] === 'Currency') {
                item = LootManager.class.CurrencyClass.deserialize(serialized_data['_item']);
            }
            if (serialized_data['_price'].length > 0) {
                _.each(serialized_data['_price'], function (currency_def){
                    price.push(LootManager.class.CurrencyClass.deserialize(currency_def));
                });
            }

            offer_object = new Offer(
                item
            );

            offer_object._starting_quantity = serialized_data['_starting_quantity'];
            offer_object._offer_targets = serialized_data['_offer_targets'];
            offer_object._price = price;
            offer_object._history = serialized_data['_history'];
            offer_object._hidden = serialized_data['_hidden'];
            offer_object._id = serialized_data['_id'];

            return offer_object;
        } // end deserialize
    }, // end Offer
    OfferManagerClass: class OfferManager {
        constructor() {
            this._translator = new state['LootManagerPlugin']['plugin']();
            this._script_name = LootManager.script_name;
        } // end constructor

        _getCharacterInventory(character_id) {
            var character_object = findObjs({
                type: 'character',
                characterid: character_id
            });

            if (character_object === undefined) {
                throw `Unable to find character with ID ${character_id}`;
            }

            return this._translator.read(character_id);
        } // end _getCharacterInventory

        getOffer(offer_id) {
            if (_.has(state[this._script_name]['offers'], offer_id)) {
                var offer = LootManager.class.OfferClass.deserialize(
                    state[this._script_name]['offers'][offer_id]
                );
                return offer;
            }
            else if (_.has(state[this._script_name]['previous_offers'], offer_id)) {
                var offer = LootManager.class.OfferClass.deserialize(
                    state[this._script_name]['previous_offers'][offer_id]
                );
                return offer;
            }
            return undefined;
        } // end getOffer

        isOfferActive(offer) {
            if (_.has(state[this._script_name]['offers'], offer.getID())) {
                return true;
            }

            return false;
        } // end isOfferActive

        isOfferInactive(offer) {
            if (_.has(state[this._script_name]['previous_offers'], offer.getID())) {
                return true;
            }

            return false;
        } // end isOfferInactive

        addToOfferQueue(args) {
            var self = this;
            var item = args['item'];
            var quantity = args['quantity'];
            var character_id = args['character_id'];
            var offer_targets = args['offer_targets'];
            var price = args['price'];
            var all = args['all'];
            var npc = args['npc'];
            var copied_item;
            var offer_object;

            if (item === undefined) {
                throw new TypeError(`No item was specified`);
            }

            if (!(item instanceof LootManager.class.InventoryItemClass) && !(item instanceof LootManager.class.CurrencyClass)) {
                var all_inventory = self.getItemsToOffer(character_id);
                var found_items = _.filter(all_inventory, function (inventory_item) {
                    if (inventory_item instanceof LootManager.class.InventoryItemClass) {
                        if (item.toLowerCase() === inventory_item.getName().toLowerCase()) {
                            return true;
                        }
                        return false;
                    }
                    else if (inventory_item instanceof LootManager.class.CurrencyClass) {
                        var currency_obj = self._translator.convertToCurrency(`${quantity} ${item}`);
                        if (currency_obj !== undefined)
                        {
                            if (inventory_item._matchesType(currency_obj)) {
                                return true;
                            }
                        }
                        return false;
                    }
                });

                if (found_items.length < 1) {
                    throw new TypeError(`Unable to find an item in inventory named ${item}`);
                }

                item = found_items[0];
            }

            if (all) {
                quantity = item.getQuantity();
            }

            if (price !== undefined) {
                _.each(price, function (price_obj, index) {
                    // If we have a price and it's not currently a Currency object then 
                    // make sure to convert it
                    if (price_obj !== undefined && !(price_obj instanceof LootManager.class.CurrencyClass)) {
                        var currency_obj = self._translator.convertToCurrency(price_obj);
                        if (currency_obj === undefined) {
                            throw new TypeError(`Invalid price ${price_obj} provided`);
                        }
                        price[index] = currency_obj;
                    }
                });

                // Now that we're certain we have Currency objects, we want to
                // group objects of the same type together so that we can
                // combine their quantities (in the case of someone passing the
                // same currency type in multiple times in the command).
                price = _.groupBy(price, function (obj) {
                    return obj.getName();
                });

                // With these objects now grouped by their currency type we can
                // run through price and if we find that an index has more than
                // one object in its grouped array, then we need to combine the
                // quantities together and strip the extra objects.
                _.each(price, function (array, index) {
                    var total = array[0].copyInstance();
                    total.setQuantity(Number(0));
                    _.each(array, function (obj) {
                        total.setQuantity(
                            Number(total.getQuantity()) + Number(obj.getQuantity())
                        );
                    });
                    price[index] = total;
                });

                // This last call will reform price once again into an array
                // that is just made of Currency objects.
                price = _.values(price);
            }

            if (Number(item.getQuantity()) < Number(quantity)) {
                throw new RangeError(`Cannot offer ${quantity} ${item.getName()} when you only have ${item.getQuantity()} in inventory`);
            }

            // If we've made it past all these checks then we're ready to create
            // a copy of our matching item so we can start updating
            // quantities
            copied_item = item.copyInstance();
            // Now that we've got a copy, set the quantity to the requested
            // amount to offer
            copied_item.setQuantity(quantity);
            // Make a new offer with this copied item
            offer_object = new LootManager.class.OfferClass(copied_item, offer_targets, price);
            // Now that we have an Offer, add it to the queue
            state[this._script_name]['offers'][offer_object.getID()] = offer_object.serialize();
            // Decrease the quantity of the original item by the amount
            // deducted in order to create the offer
            item.setQuantity(item.getQuantity() - quantity);
            // If we were given the NPC flag, then don't update the quantities
            // in the character sheet
            if (!npc) {
                if (item.getQuantity() > 0) {
                    // And finally update the currency in the character sheet
                    self._translator.update(item);
                }
                else {
                    self._translator.delete(item);
                }
            }

            return offer_object.getID();
        } // end addItemToOfferQueue

        moveOfferToPreviousQueue(offer) {
            var offer_id = offer.getID();
            var item = offer.getItem();

            item.setQuantity(offer.getStartingQuantity());

            state[this._script_name]['previous_offers'][offer_id] = offer.serialize();
            delete state[this._script_name]['offers'][offer_id];
        } // end moveOfferToPreviousQueue

        returnOfferToCharacter(offer) {
            var item = offer.getItem()
            var character_id = item.getCharacterID();
            var update = false;

            if (this.isOfferActive(offer)) {
                offer.recalled();
                this.moveOfferToPreviousQueue(offer);
            }

            // Do some extra steps when recalling currency since they don't tend
            // to have repeating fields, like an item generally would
            if (item instanceof LootManager.class.CurrencyClass) {
                var matching_currency = this._translator.read(character_id);
                matching_currency = _.filter(matching_currency, function (inventory_currency) {
                    if (inventory_currency instanceof LootManager.class.CurrencyClass && inventory_currency._matchesType(item)) {
                        return true;
                    }
                    return false;
                });

                if (matching_currency.length < 1) {
                    matching_currency = item.copyInstance();
                    matching_currency.setQuantity(0);
                }
                else {
                    matching_currency = matching_currency[0];
                    update = true;
                }

                // Now that we have the character's current matching currency,
                // let's add that to the recalled currency that way when we
                // write out the currency to the sheet, it will be the
                // combined value and not just the recalled value
                matching_currency.add(item);
                item = matching_currency;
            }
            else if (item instanceof LootManager.class.InventoryItemClass) {
                var inventory_items = this._translator.read(character_id);
                var matching_item = _.filter(inventory_items, function (inventory_item) {
                    if (inventory_item instanceof LootManager.class.InventoryItemClass && inventory_item.getName() === item.getName()) {
                        return true;
                    }
                    return false;
                });

                if (matching_item.length < 1) {
                    matching_item = item.copyInstance();
                    matching_item.setQuantity(0);
                }
                else {
                    matching_item = matching_item[0];
                    update = true;
                }

                // Now that we have the character's current matching currency,
                // let's add that to the recalled currency that way when we
                // write out the currency to the sheet, it will be the
                // combined value and not just the recalled value
                matching_item.setQuantity(Number(item.getQuantity()) + Number(matching_item.getQuantity()));
                item = matching_item;
            }
            else {
                throw new TypeError('Unknown item type supplied ' + typeof(item));
            }

            if (update) {
                this._translator.update(item);
            }
            else {
                this._translator.write(character_id, item);
            }
        } // end returnOfferToCharacter

        claimOffer(offer, character_id, amount) {
            var self = this;
            var item = offer.getItem();
            var character = getObj('character', character_id);
            var item_to_character;

            if (self.isOfferInactive(offer)) {
                var offer_id = offer.getID();
                throw new ReferenceError(`Offer ${offer_id} is no longer available`);
            }

            if (!offer.isVisibleTo(character)) {
                var offer_id = offer.getID();
                throw new ReferenceError(`Offer ${offer_id} is not available to ${character.get('name')}`);
            }

            if (item.getQuantity() < amount) {
                var offer_id = offer.getID();
                throw new ReferenceError(`Attempted to take more than offered in offer ${offer_id}`);
            }

            // If the offer has a price set on it make sure the character can
            // pay and then take that amount out of their inventory
            if (offer.getPrice() !== undefined) {
                var paid_currencies;
                if (!self._canCharacterPay(character_id, offer.getPrice())) {
                    throw new RangeError("Unable to pay the requested price");
                }

                paid_currencies = self._makeCharacterPay(character_id, offer.getPrice());
                self._payCharacter(item.getCharacterID(), paid_currencies);
            }

            var all_inventory = self.getItemsToOffer(character_id);
            var item_in_sheet = _.filter(all_inventory, function (inventory_item) {
                if (inventory_item instanceof LootManager.class.InventoryItemClass) {
                    if (item.getName().toLowerCase() === inventory_item.getName().toLowerCase()) {
                        return true;
                    }
                    return false;
                }
                else if (inventory_item instanceof LootManager.class.CurrencyClass) {
                    if (item.getName().toLowerCase() === inventory_item.getUnit().toLowerCase() || item.getName().toLowerCase() === inventory_item.getUnit(true).toLowerCase()) {
                        return true;
                    }
                    return false;
                }
            });

            if (item_in_sheet.length < 1) {
                item_in_sheet = item.copyInstance();
                item_in_sheet.setQuantity(0);
            }
            else {
                item_in_sheet = item_in_sheet[0];
            }

            // Make a copy of the offer item so that when we pull the quantity
            // of the item to put into the character sheet, the quantity of the
            // item in the offer will be updated independently.
            item_to_character = item.copyInstance();
            item_to_character.setQuantity(amount);

            if (item_in_sheet.getQuantity() === 0) {
                self._translator.write(character_id, item_to_character);
            }
            else {
                item_in_sheet.setQuantity(Number(item_in_sheet.getQuantity()) + Number(item_to_character.getQuantity()));
                self._translator.update(item_in_sheet);
            }

            item.setQuantity(item.getQuantity() - amount);

            if (item.getQuantity() === 0) {
                // Make sure we move the offer into the previous offer queue
                // after the amount is reduced to zero
                self.moveOfferToPreviousQueue(offer);
            }

            offer.claimedBy(character, amount);
        } // end claimOffer

        _canCharacterPay(character_id, price) {
            var self = this;
            var script_name = LootManager.script_name;
            var inventory_items = self._translator.read(character_id);
            var can_pay = {};
            var able_to_pay = false;

            _.each(price, function (currency_obj) {
                can_pay[currency_obj.getName()] = false;
                _.each(inventory_items, function (item_object) {
                    // We're looking for objects that are an instance of a
                    // Currency object
                    if (item_object instanceof LootManager.class.CurrencyClass) {
                        // Also check to make sure it's the same type of
                        // Currency object as the price
                        if (item_object._matchesType(currency_obj)) {
                            // And also make sure the character has at least the
                            // price requested
                            if (item_object.getQuantity() >= currency_obj.getQuantity()) {
                                can_pay[currency_obj.getName()] = true;
                            }
                        }
                    }
                });
            });

            able_to_pay = !(_.chain(can_pay).values().contains(false).value());

            if (!able_to_pay && state[script_name]['config']['convert_currency']) {
                var currencies = self._translator.getEquivalentCurrency(character_id, price);
                if (currencies !== undefined) {
                    able_to_pay = true;
                }
            }

            return able_to_pay;
        } // end canCharacterPay

        _makeCharacterPay(character_id, price) {
            var self = this;
            var script_name = LootManager.script_name;
            var inventory_items = self._translator.read(character_id);
            var payment = {};
            var able_to_pay = false;

            _.each(price, function (currency_obj) {
                payment[currency_obj.getName()] = false;
                _.each(inventory_items, function (item_object) {
                    // We're looking for objects that are an instance of a
                    // Currency object
                    if (item_object instanceof LootManager.class.CurrencyClass) {
                        // Also check to make sure it's the same type of
                        // Currency object as the price
                        if (item_object._matchesType(currency_obj)) {
                            // And also make sure the character has at least the
                            // price requested
                            if (item_object.getQuantity() >= currency_obj.getQuantity()) {
                                payment[currency_obj.getName()] = currency_obj;
                            }
                        }
                    }
                });
            });

            able_to_pay = !(_.chain(payment).values().contains(false).value());

            if (!able_to_pay && state[script_name]['config']['convert_currency']) {
                var currencies = self._translator.getEquivalentCurrency(character_id, price);
                if (currencies !== undefined) {
                    able_to_pay = true;
                }

                payment = currencies;
            }
            else {
                payment = _.values(payment);
            }

            _.each(payment, function (currency_obj) {
                var found = false;
                _.each(inventory_items, function (item_object) {
                    if (!found) {
                        // We're looking for objects that are an instance of a
                        // Currency object
                        if (item_object instanceof LootManager.class.CurrencyClass) {
                            // Also check to make sure it's the same type of
                            // Currency object as the price
                            if (item_object._matchesType(currency_obj)) {
                                found = true;
                                // If we've made it this far, subtract the offer
                                // price and write the new amount to the character
                                // sheet
                                item_object.subtract(currency_obj);
                                self._translator.update(item_object);
                            }
                        }
                    }
                });
            });

            return payment;
        } // end _makeCharacterPay

        _payCharacter(character_id, payment) {
            var self = this;
            var inventory_items = self._translator.read(character_id);

            _.each(payment, function (currency_obj) {
                var found = false;
                var price_paid = false;
                _.each(inventory_items, function (item_object) {
                    if (!found) {
                        // We're looking for objects that are an instance of a
                        // Currency object
                        if (item_object instanceof LootManager.class.CurrencyClass) {
                            // Also check to make sure it's the same type of
                            // Currency object as the price
                            if (item_object._matchesType(currency_obj)) {
                                found = true;
                                // If we've made it this far, subtract the offer
                                // price and write the new amount to the character
                                // sheet
                                item_object.add(currency_obj);
                                self._translator.update(item_object);
                                price_paid = true;
                            }
                        }
                    }
                });

                // If the price hasn't been paid, that is due to being unable to
                // find and update the field in the sheet. This should come down
                // to the field not existing in the sheet. Instead of doing
                // an update, do a write.
                if (!price_paid) {
                    self._translator.write(character_id, currency_obj);
                }
            });
        } // end _payCharacter

        getAllActiveOffers() {
            var offers = [];

            _.each(state[this._script_name]['offers'], function (offer) {
                offers.push(LootManager.class.OfferClass.deserialize(offer));
            });

            return offers;
        } // end getAllActiveOffers

        getActiveOffersForCharacter(character) {
            var offers = [];

            _.each(this.getAllActiveOffers(), function (offer) {
                if (offer.isVisibleTo(character)) {
                    offers.push(offer);
                }
            });

            return offers;
        } // end getActiveOffersForPlayer

        getAllPreviousOffers() {
            var offers = [];

            _.each(state[this._script_name]['previous_offers'], function (offer) {
                offers.push(LootManager.class.OfferClass.deserialize(offer));
            });

            return offers;
        } // end getAllActiveOffers

        getItemsToOffer(character_id) {
            return this._translator.read(character_id);
        } // end getItemsToOffer

        dropOffer(offer, character_id) {
            var character = getObj('character', character_id);
            offer.droppedBy(character);
            this.moveOfferToPreviousQueue(offer);
        } // end dropOffer

        hideOffer(offer) {
            offer.hide();

            if (this.isOfferActive(offer)) {
                state[this._script_name]['offers'][offer.getID()] = offer.serialize();
            }
            else {
                state[this._script_name]['previous_offers'][offer.getID()] = offer.serialize();
            }
        } // end hideOffer

        unhideOffer(offer) {
            offer.unhide();

            if (this.isOfferActive(offer)) {
                state[this._script_name]['offers'][offer.getID()] = offer.serialize();
            }
            else {
                state[this._script_name]['previous_offers'][offer.getID()] = offer.serialize();
            }
        } // end hideOffer

        // WARNING: this is not a method to be taken lightly. This will
        // purge the entire offer queue of data. This should only be performed
        // if you are absolutely sure you need to reset to a clean state.
        clearOfferQueue() {
            delete state[this._script_name]['offers'];
            state[this._script_name]['offers'] = {};
        } // end clearOfferQueue

        // WARNING: this is not a method to be taken lightly. This will
        // purge the entire previous offer queue of data. This should only be
        // performed if you are absolutely sure you need to reset to a clean
        // state.
        clearPreviousOfferQueue() {
            delete state[this._script_name]['previous_offers'];
            state[this._script_name]['previous_offers'] = {};
        } // end clearPreviousOfferQueue
    },
    ArgumentParserClass: class ArgumentParser {
        constructor(prog, usage, description, epilog) {
            this.prog               = prog;
            this.usage              = usage;
            this.description        = description;
            this.epilog             = epilog;
            this.action_store       = {};
            this.parsed_args        = {};
            this.unparsed_args      = [];
            this.script_name        = '';
        }

        addArgument(named_options) {
            const valid_actions = ['store', 'store_true', 'store_false', 'append', 'count', 'help'];
            const valid_types   = ['integer', 'int', 'float', 'number', 'num', 'string', 'str'];
            var self = this;

            if (typeof named_options !== 'object' || named_options === null) {
                var err = "Must provide a valid named_options object to add_argument";
                log(err);
                throw new TypeError(err);
            }

            // arguments is a required key so make sure it exists
            if (!_.has(named_options, 'arguments')) {
                var err = "Must provide an arguments key in the named_options object to addArgument";
                log(err);
                throw new TypeError(err);
            }

            // dest is a required key so make sure it exists
            if (!_.has(named_options, 'dest')) {
                var err = "Must provide an dest key in the named_options object to addArgument";
                log(err);
                throw new TypeError(err);
            }

            // Make sure that if we're passed a string as arguments option that
            // we force it into a list
            if (typeof !named_options['arguments'] === 'string') {
                named_options['arguments'] = [named_options['arguments']];
            }

            // Make sure we're not using a number as an argument flag since
            // this will get us into situations where we can't discern a flag
            // from a negative number
            _.each(named_options['arguments'], function(argument_string) {
                if (argument_string.match(/^-\d+$|^-\d*\.\d+$/)) {
                    var err = "Cannot use a number as an argument flag";
                    log(err);
                    throw new TypeError(err);
                }
            });

            // If we don't have an action defined for the argument, then default
            // it to 'store'
            if (!_.has(named_options, 'action')) {
                named_options['action'] = 'store';
            }

            // Do a quick check to make sure we have a valid action supplied
            if (!_.contains(valid_actions, named_options['action'])) {
                var err = `Action ${named_options['action']} is not a valid argument action`;
                log(err);
                throw new TypeError(err);
            }

            // If a type was supplied, make sure it's one of the types we know
            if (_.has(named_options, 'type')) {
                if (!_.contains(valid_types, named_options['type'])) {
                    var err = `Action ${named_options['type']} is not a valid argument action`;
                    log(err);
                    throw new TypeError(err);
                }
            }

            // Store off the argument parameters for use later when we're
            // parsing
            _.each(named_options['arguments'], function (argument) {
                self.action_store[argument] = {
                    name: argument,
                    action: named_options['action'],
                    dest: named_options['dest']
                };
                if (_.has(named_options, 'default')) {
                    self.action_store[argument]['default'] = named_options['default'];
                }
                if (_.has(named_options, 'help')) {
                    self.action_store[argument]['help'] = named_options['help'];
                }

            });
        } // end add_argument

        parseArgs(args) {
            var self = this;
            delete self.parsed_args;
            delete self.unparsed_args;
            self.parsed_args   = {};
            self.unparsed_args = [];
            // We can take in both a string of the entire command or it already
            // split into an array of args. If it comes in as a string we need
            // to go through and split it up before passing it along
            if (typeof args === 'string') {
                args = args.match(/"[^"]+"|\S+/g);

                // We want to strip off any double quotes from their strings
                // so double check if a string begins and ends with double
                // quotes
                _.each(args, function (arg, index) {
                    if (arg.match(/^".+?"$/)) {
                        args[index] = arg.match(/^"(.+?)"$/)[1];
                    }
                });
            }

            self.script_name = args.shift();

            if (args.length <= 0) {
                return;
            }

            // Store off all the default values to start with. If an argument
            // ends up getting supplied on the command line then the further
            // down code will actually take care of overwriting the default
            // value.
            _.each(self.action_store, function (argument_definition, argument_name) {
                if (_.has(argument_definition, 'default')) {
                    var dest = argument_definition['dest'];
                    self.parsed_args[dest] = argument_definition['default'];
                }
            });

            // Start iterating through the remaining args to see if there are
            // any matches in our action store
            for (var i = 0; i < args.length; i++) {
                var argument = args[i];
                // Found a matching argument in our action store
                if (_.has(self.action_store, argument)) {
                    var action = self.action_store[argument]['action'];
                    switch (action) {
                        case 'store':
                            var store_value;
                            var dest = self.action_store[argument]['dest'];
                            i++;
                            store_value = args[i];
                            if (_.has(self.action_store[argument], 'type')) {
                                switch (self.action_store[argument]['type']){
                                    case 'integer':
                                        // Intentional fall-thru
                                    case 'int':
                                        store_value = parseInt(store_value);
                                        break;
                                    case 'float':
                                        store_value = parseFloat(store_value);
                                        break;
                                    case 'number':
                                        // Intentional fall-thru
                                    case 'num':
                                        store_value = Number(store_value);
                                        break;
                                }
                            }
                            // Store off the value
                            self.parsed_args[dest] = store_value;
                            break;
                        case 'store_true':
                            var store_value = true;
                            var dest = self.action_store[argument]['dest'];
                            // Store off the value
                            self.parsed_args[dest] = store_value;
                            break;
                        case 'store_false':
                            var store_value = false;
                            var dest = self.action_store[argument]['dest'];
                            // Store off the value
                            self.parsed_args[dest] = store_value;
                            break;
                        case 'append':
                            var store_value;
                            var dest = self.action_store[argument]['dest'];
                            i++;
                            store_value = args[i];
                            if (_.has(self.action_store[argument], 'type')) {
                                switch (self.action_store[argument]['type']){
                                    case 'integer':
                                        // Intentional fall-thru
                                    case 'int':
                                        store_value = parseInt(store_value);
                                        break;
                                    case 'float':
                                        store_value = parseFloat(store_value);
                                        break;
                                    case 'number':
                                        // Intentional fall-thru
                                    case 'num':
                                        store_value = Number(store_value);
                                        break;
                                }
                            }
                            // Check if _parsed_args already has an entry for
                            // this or create a new array if one doesn't exist
                            if (_.has(self.parsed_args, dest)) {
                                self.parsed_args[dest].push(store_value);
                            }
                            else {
                                self.parsed_args[dest] = [store_value];
                            }
                            break;
                        case 'count':
                            var dest = self.action_store[argument]['dest'];
                            // Check if _parsed_args already has an entry for
                            // this or create a new array if one doesn't exist
                            if (_.has(self.parsed_args, dest)) {
                                self.parsed_args[dest]++;
                            }
                            else {
                                self.parsed_args[dest] = 1;
                            }
                            break;
                        case 'help':
                            showHelp();
                            return;
                    }
                }
                else {
                    self.unparsed_args.push(argument);
                }
            }
        } // end parse_args

        get scriptName() {
            return this.script_name;
        }

        get parsedArgs() {
            return this.parsed_args;
        }

        get unparsedArgs() {
            return this.unparsed_args;
        }

        showHelp() {
            // Fill in later
        }
    } // end ArgumentParser
};

LootManager.handleInput = (msg_orig) => {
    var msg = _.clone(msg_orig);
    var argParser;
    var commands;
    var offerManager;
    var player_id = msg.playerid;
    var selected = msg.selected;
    var character;
    var character_id;
    var character_name;
    var script_name = LootManager.script_name;

    if (msg_orig.type !== "api" ) {
        return;
    }

    argParser = new LootManager.class.ArgumentParserClass();

    argParser.addArgument({
        arguments: ['--all'],
        action: 'store_true',
        dest: 'all',
        default: false
    });

    argParser.addArgument({
        arguments: ['--target', '-t'],
        action: 'append',
        dest: 'targets',
        default: []
    });

    argParser.addArgument({
        arguments: ['--price', '-p'],
        action: 'append',
        dest: 'price',
        default: []
    });

    argParser.addArgument({
        arguments: ['--force'],
        action: 'store_true',
        dest: 'force',
        default: false
    });

    argParser.addArgument({
        arguments: ['--quantity', '-q'],
        action: 'store',
        dest: 'quantity',
        type: 'number',
        default: 1
    });

    argParser.addArgument({
        arguments: ['--npc'],
        action: 'store_true',
        dest: 'npc',
        default: false
    });

    argParser.parseArgs(msg.content);

    if (argParser.scriptName !== '!loot-manager') {
        return;
    }

    // Check if we have a LootManagerPlugin installed
    if (!_.has(state, 'LootManagerPlugin')) {
        LootManager.showMessage(player_id, 'ERROR: Need to install a system-specific plugin before using LootManager');
        return;
    }

    if (selected === undefined) {
        LootManager.showMessage(player_id, 'Please select a character token to use LootManager with');
        return;
    }
    else if (selected.length > 1) {
        LootManager.showMessage(player_id, 'Please select only one character token to use LootManager with');
        return;
    }

    offerManager = new LootManager.class.OfferManagerClass();

    commands = argParser.unparsedArgs;
    character_id = getObj(selected[0]._type, selected[0]._id).get('represents');

    if (character_id === undefined) {
        LootManager.showMessage(player_id, 'LootManager requires character token be tied to a character');
        return;
    }

    character = getObj('character', character_id);
    if (character === undefined) {
        LootManager.showMessage(player_id, '**ERROR**: Unable to find a character associated with the token (maybe forgot to set the "Represents Character" dropdown in Edit Token?)');
        return;
    }
    character_name = character.get('name');

    switch(commands.shift()) {
        case 'show':
            switch(commands.shift()) {
                // Show the available offers queue
                case 'available':
                    var offers;
                    if (playerIsGM(player_id)) {
                        offers = offerManager.getAllActiveOffers();
                    }
                    else {
                        offers = offerManager.getActiveOffersForCharacter(character);
                    }
                    if (offers.length < 1) {
                        LootManager.showMessage(player_id, 'No offers currently available');
                    }
                    LootManager.displayOffers(player_id, character, offers);
                    break;
                    // end show available
                // Show the previous offers queue (GM-only)
                case 'previous':
                    var offers;
                    if (!playerIsGM(player_id)) {
                        return;
                    }
                    offers = offerManager.getAllPreviousOffers();
                    LootManager.displayOffers(player_id, character, offers);
                    break;
                    // end show previous
                // Show the item of a particular offer
                case 'item':
                    var offer_id = commands.shift();
                    var offer = offerManager.getOffer(offer_id);
                    var item;
                    if (offer === undefined) {
                        LootManager.showMessage(player_id, `**Offer ${offer_id}** does not exist`);
                    }
                    item = offer.getItem();
                    LootManager.displayItems(player_id, item);
                    break;
                    // end show item
                case 'history':
                    var offer_id = commands.shift();
                    var offer = offerManager.getOffer(offer_id);
                    if (offer === undefined) {
                        LootManager.showMessage(player_id, `**Offer ${offer_id}** does not exist`);
                    }
                    LootManager.displayHistory(player_id, offer);
                    break;
                    // end show history
                default:
                    var offers = [];
                    _.each(commands, function (offer_id) {
                        var offer = offerManager.getOffer(offer_id);
                        if (offer !== undefined) {
                            offers.push(offer);
                        }
                    });
                    LootManager.displayOffers(player_id, character, offers);
                    break;
            } // end show switch
            break;
        // end show
        case 'make':
            switch(commands.shift()) {
                case 'offer':
                    // If the player is the GM and supplied the NPC flag, this
                    // will tell the offer manager to not remove or update
                    // item and currency quantities in the sheet (to make life
                    // easier for the GM, so that they don't have the make a
                    // bunch of copies of NPC sheets whenever they need to allow
                    // for loot).
                    var npc = false;
                    if (playerIsGM(player_id)) {
                        npc = argParser.parsedArgs['npc'];
                    }
                    switch(commands.shift()) {
                        case 'item':
                            // If we have any extra commands, assume those to be
                            // the name of the item to add to the offer queue
                            if (commands.length > 0) {
                                var item_name = commands.join(' ');
                                var item;
                                try {
                                    offer_id = offerManager.addToOfferQueue(
                                        {
                                            item: item_name,
                                            quantity: argParser.parsedArgs['quantity'],
                                            character_id: character_id,
                                            offer_targets: argParser.parsedArgs['targets'],
                                            price: argParser.parsedArgs['price'],
                                            all: argParser.parsedArgs['all'],
                                            npc: npc
                                        }
                                    );
                                }
                                catch (err) {
                                    LootManager.showMessage(player_id, err.message);
                                    return;
                                }
                                item = offerManager.getOffer(offer_id).getItem();
                                LootManager.showMessage(player_id, `**${character_name}** offered **${item.getName()} (Qty. ${item.getQuantity()})** (Offer ID: *${offer_id}*)`);
                            }
                            // If we don't have any extra commands beyond "make
                            // offer item" then present the player with the
                            // items they currently carry to see what they would
                            // like to offer.
                            else {
                                // Get a list of all of the items in the character's
                                // inventory
                                var all_inventory = offerManager.getItemsToOffer(character_id);
                                // This will give us a slimmed down list of
                                // inventory items with the currencies pulled out
                                var items = _.filter(all_inventory, function (test_item) {
                                    if (test_item instanceof LootManager.class.InventoryItemClass) {
                                        return true;
                                    }
                                    return false;
                                });
                                LootManager.displayItemsForOffer(player_id, items);
                            }
                            break;
                            // end make offer item
                        case 'currency':
                            // If we have any extra commands, assume those to be
                            // the names of the items to add to the offer queue
                            if (commands.length > 0) {
                                var input_currency = commands.join(' ');
                                var currency;
                                try {
                                    offer_id = offerManager.addToOfferQueue(
                                        {
                                            item: input_currency,
                                            quantity: argParser.parsedArgs['quantity'],
                                            character_id: character_id,
                                            offer_targets: argParser.parsedArgs['targets'],
                                            price: argParser.parsedArgs['price'],
                                            all: argParser.parsedArgs['all'],
                                            npc: npc
                                        }
                                    );
                                }
                                catch (err) {
                                    LootManager.showMessage(player_id, err.message);
                                    return;
                                }
                                currency = offerManager.getOffer(offer_id).getItem();
                                LootManager.showMessage(player_id, `**${character_name}** offered **${currency.toString()}** (Offer ID: *${offer_id}*)`);
                            }
                            // If we don't have any extra commands beyond "make
                            // offer currency" then present the player with
                            // the currencies they currently carry to see what
                            // they would like to offer.
                            else {
                                // Get a list of all of the items in the character's
                                // inventory
                                var all_inventory = offerManager.getItemsToOffer(character_id);
                                // This will give us a slimmed down list of
                                // inventory items with the currencies pulled out
                                var currencies = _.filter(all_inventory, function (test_item) {
                                    if (test_item instanceof LootManager.class.CurrencyClass) {
                                        return true;
                                    }
                                    return false;
                                });
                                LootManager.displayItemsForOffer(player_id, currencies);
                            }
                            break;
                            // end make offer currency
                        case 'hidden':
                            if (!playerIsGM(player_id)) {
                                LootManager.showMainMenu();
                                return;
                            }

                            if (commands.length > 0) {
                                var offer_id = commands.shift();
                                var offer = offerManager.getOffer(offer_id);

                                if (offer === undefined) {
                                    LootManager.showMessage(player_id, `**Offer ${offer_id}** does not exist`);
                                    return;
                                }

                                offerManager.hideOffer(offer);

                                LootManager.showMessage(player_id, `**Offer ${offer_id}** has been hidden from player view`);
                                return;
                            }
                            break;
                            // end make offer hidden
                        case 'visible':
                            if (!playerIsGM(player_id)) {
                                LootManager.showMainMenu();
                                return;
                            }

                            if (commands.length > 0) {
                                var offer_id = commands.shift();
                                var offer = offerManager.getOffer(offer_id);

                                if (offer === undefined) {
                                    LootManager.showMessage(player_id, `**Offer ${offer_id}** does not exist`);
                                    return;
                                }

                                offerManager.unhideOffer(offer);

                                LootManager.showMessage(player_id, `**Offer ${offer_id}** has been made visible to players`);
                                return;
                            }
                            break;
                            // end make offer visible
                        default:
                            var all_inventory = offerManager.getItemsToOffer(character_id);
                            if (argParser.parsedArgs['all']) {
                                if (playerIsGM(player_id)) {
                                    _.each(all_inventory, function (item) {
                                        var offer_id;
                                        var offer_item;
                                        try {
                                            offer_id = offerManager.addToOfferQueue(
                                                {
                                                    item: item,
                                                    character_id: character_id,
                                                    offer_targets: argParser.parsedArgs['targets'],
                                                    price: argParser.parsedArgs['price'],
                                                    all: argParser.parsedArgs['all'],
                                                    npc: npc
                                                }
                                            );
                                        }
                                        catch (err) {
                                            LootManager.showMessage(player_id, err.message);
                                            return;
                                        }
                                        offer_item = offerManager.getOffer(offer_id).getItem();
                                        if (offer_item instanceof LootManager.class.InventoryItemClass) {
                                            LootManager.showMessage(player_id, `**${character_name}** offered **${item.getName()} (Qty. ${item.getQuantity()})** (Offer ID: *${offer_id}*)`);
                                        }
                                        else if (offer_item instanceof LootManager.class.CurrencyClass) {
                                            LootManager.showMessage(player_id, `**${character_name}** offered **${offer_item.toString()}** (Offer ID: *${offer_id}*)`);
                                        }
                                    });
                                }
                                else {
                                    LootManager.displayItemsForOffer(player_id, all_inventory);
                                }
                            }
                            // If there are no extra commands (meaning no
                            // specified items) and we weren't supplied with the
                            // --all argument, then prompt the player for which
                            // items they want to offer
                            else {
                                LootManager.displayItemsForOffer(player_id, all_inventory);
                            }
                            break;
                            // end make offer
                    }
            }
            break;
            // end make
        case 'claim':
            switch(commands.shift()) {
                case 'item':
                    _.each(commands, function (offer_id) {
                        var offer = offerManager.getOffer(offer_id);
                        if (offer !== undefined) {
                            if (offer.getItem() instanceof LootManager.class.CurrencyClass) {
                                LootManager.showMessage(player_id, `That offer is for currency. Please use "!loot-manager claim currency --quantity <quantity> ${offer_id}" instead`);
                                return;
                            }
                            if (playerIsGM(player_id) || offer.isVisibleTo(character)) {
                                if (!playerIsGM(player_id) && offerManager.isOfferInactive(offer)) {
                                    LootManager.showMessage(player_id, 'That offer is no longer active');
                                    return;
                                }
                                var item = offer.getItem();
                                try {
                                    offerManager.claimOffer(offer, character_id, argParser.parsedArgs['quantity']);
                                    LootManager.showMessage(player_id, `**${character_name}** claimed offer for **${argParser.parsedArgs['quantity']} ${item.getName()}**`);
                                }
                                catch (err) {
                                    if (err instanceof ReferenceError) {
                                        LootManager.showMessage(player_id, err.message);
                                    }
                                    else if (err instanceof RangeError) {
                                        LootManager.showMessage(player_id, err.message);
                                    }
                                    else {
                                        throw err;
                                    }
                                }
                            }
                            else {
                                LootManager.showMessage(player_id, 'You do not have access to that offer');
                                return;
                            }
                        }
                    });
                    break;
                    // end claim item
                case 'currency':
                    var offer_id = commands[0];
                    var offer = offerManager.getOffer(offer_id);

                    if (offer !== undefined) {
                        if (offer.getItem() instanceof LootManager.class.InventoryItemClass) {
                            LootManager.showMessage(player_id, `That offer is for an item. Please use "!loot-manager claim item --quantity <quantity> ${offer_id}" instead`);
                            return;
                        }
                        if (playerIsGM(player_id) || offer.isVisibleTo(character)) {
                            if (!playerIsGM(player_id) && offerManager.isOfferInactive(offer)) {
                                LootManager.showMessage(player_id, 'That offer is no longer active');
                                return;
                            }
                            var currency = offer.getItem();
                            try {
                                var unit;
                                offerManager.claimOffer(offer, character_id, argParser.parsedArgs['quantity']);
                                if (argParser.parsedArgs['quantity'] > 1) {
                                    unit = currency.getUnit(true);
                                }
                                else {
                                    unit = currency.getUnit();
                                }
                                LootManager.showMessage(player_id, `**${character_name}** claimed offer for **${argParser.parsedArgs['quantity']} ${unit}**`);
                            }
                            catch (err) {
                                if (err instanceof ReferenceError) {
                                    LootManager.showMessage(player_id, err.message);
                                }
                                else if (err instanceof RangeError) {
                                    LootManager.showMessage(player_id, err.message);
                                }
                                else {
                                    throw err;
                                }
                            }
                        }
                        else {
                            LootManager.showMessage(player_id, 'You do not have access to that offer');
                        }
                    }
                    break;
                    // end claim currency
                default:
                    var offers;
                    if (playerIsGM(player_id)) {
                        offers = offerManager.getAllActiveOffers();
                    }
                    else {
                        offers = offerManager.getActiveOffersForPlayer(player_id);
                    }
                    if (offers.length < 1) {
                        LootManager.showMessage(player_id, 'No offers currently available');
                    }
                    LootManager.displayOffers(player_id, character, offers);
                    break;
                    // end claim
            } // end claim switch
            break;
        case 'drop':
            _.each(commands, function (offer_id) {
                var offer = offerManager.getOffer(offer_id);
                if (offer !== undefined) {
                    if (offerManager.isOfferInactive(offer)) {
                        LootManager.showMessage(player_id, 'That offer is already inactive');
                        return;
                    }
                    var item = offer.getItem();
                    if (playerIsGM(player_id) || item.getCharacterID() === character_id) {
                        offerManager.dropOffer(offer, character_id);
                        LootManager.showMessage(player_id, `Dropped offer of ${item.getName()}. It will no longer be available to claim`);
                    }
                    else {
                        LootManager.showMessage(player_id, 'You do not have access to that offer');
                        return;
                    }
                }
            });
            break;
            // end drop
        case 'recall':
            _.each(commands, function (offer_id) {
                var offer = offerManager.getOffer(offer_id);
                if (offer !== undefined) {
                    var item = offer.getItem();
                    if (playerIsGM(player_id) || item.getCharacterID() === character_id) {
                        var recalled_character = getObj('character', item.getCharacterID());
                        offerManager.returnOfferToCharacter(offer);
                        LootManager.showMessage(player_id, `Recalled **${item.getName()}** to **${recalled_character.get('name')}**`);
                    }
                    else {
                        LootManager.showMessage(player_id, 'You do not have access to that offer');
                    }
                }
            });
            break;
            // end recall
        case 'clear':
            if (!playerIsGM(player_id)) {
                return;
            }
            switch(commands.shift()) {
                case 'offers':
                    if (argParser.parsedArgs['force']) {
                        offerManager.clearOfferQueue();
                        LootManager.showMessage(player_id, 'The offer queue has been purged of data');
                    }
                    else {
                        LootManager.showMessage(player_id, 'Clearing the offer queue will result in data loss. Please enter the command again with --force to confirm that you wish to clear the offer queue');
                    }
                    break;
                case 'previous':
                    if (argParser.parsedArgs['force']) {
                        offerManager.clearPreviousOfferQueue();
                        LootManager.showMessage(player_id, 'The previous offer queue has been purged of data');
                    }
                    else {
                        LootManager.showMessage(player_id, 'Clearing the previous offer queue will result in data loss. Please enter the command again with --force to confirm that you wish to clear the previous offer queue');
                    }
                    break;
            } // end clear switch
            break;
            // end recall
        case 'config':
            if (!playerIsGM(player_id)) {
                return;
            }
            switch(commands.shift()) {
                case 'convert-currency':
                    var setting = commands.shift();
                    if (setting !== undefined) {
                        if (setting.toLowerCase() === 'yes' || setting.toLowerCase() === 'true' || setting.toLowerCase() === 'on') {
                            state[script_name]['config']['convert_currency'] = true;
                            LootManager.showMessage(player_id, '**LootManager** will now try use currency conversion rates on prices');
                            return;
                        }
                        else if (setting.toLowerCase() === 'no' || setting.toLowerCase() === 'false' || setting.toLowerCase() === 'off') {
                            state[script_name]['config']['convert_currency'] = false;
                            LootManager.showMessage(player_id, '**LootManager** will now only use exact currency matching on prices');
                            return;
                        }
                    }

                    if (state[script_name]['config']['convert_currency']) {
                        LootManager.showMessage(player_id, '**LootManager** currently uses currency conversion rates on prices');
                        return;
                    }
                    else {
                        LootManager.showMessage(player_id, '**LootManager** currently uses exact currency matching on prices');
                        return;
                    }
                    break;
                default:
                    LootManager.showMainMenu(player_id);
                    break;
            } // end clear switch
            break;
            // end recall
        default:
            LootManager.showMainMenu(player_id);
            break;
    } // end switch
}; // end handleInput

LootManager.showMessage = (player_id, message) => {
    var player_object = getObj('player', player_id);
    var player_name = player_object.get("_displayname");
    var chat_string = `/w ${player_name} `;
    var _h = LootManager._h;
    message = _h.outer(
        _h.title(LootManager.script_name, LootManager.version),
        message
    );

    sendChat("LootManager", chat_string + message, null, {noarchive:true});
}; // end showError

LootManager.showMainMenu = (player_id) => {
    var main_menu_buttons = [
        {
            brief: 'Show Available Offers',
            button_name: 'Show Available',
            button_command: '!loot-manager show available',
            gm_only: false
        },
        {
            brief: 'Show Previous Offers',
            button_name: 'Show Previous',
            button_command: '!loot-manager show previous',
            gm_only: true
        },
        {
            brief: 'Make Offer',
            button_name: 'Make Offer',
            button_command: '!loot-manager make offer',
            gm_only: false
        }
    ];
    var menu_strings = ['&{template:default}', '{{name=Main Menu}}'];

    _.each(main_menu_buttons, function (button_def) {
        var brief = button_def['brief'];
        var button_name = button_def['button_name'];
        var button_command = button_def['button_command'];
        if (_.has(button_def, 'gm_only') && button_def['gm_only'] && playerIsGM(player_id)) {
            menu_strings.push(`{{${brief}=[${button_name}](${button_command})}}`);
        }
        else if (!_.has(button_def, 'gm_only') || !button_def['gm_only']) {
            menu_strings.push(`{{${brief}=[${button_name}](${button_command})}}`);
        }
    });

    LootManager.showMessage(player_id, menu_strings.join(' '));
}; // end showMainMenu

// Unapologetically taken from TheAaron's code since it's not worth re-inventing
// the wheel. This code provides a shortcut to HTML entities for string
// substitution.
LootManager.ch = (c) => {
    const entities = {
      '<' : 'lt',
      '>' : 'gt',
      '&' : 'amp',
      "'" : '#39',
      '@' : '#64',
      '{' : '#123',
      '|' : '#124',
      '}' : '#125',
      '[' : '#91',
      ']' : '#93',
      '"' : 'quot',
      '*' : 'ast',
      '/' : 'sol',
      ' ' : 'nbsp'
    };

    if( entities.hasOwnProperty(c) ){
      return `&${entities[c]};`;
    }
    return '';
  }; // end ch

// Unapologetically taken from TheAaron's code since it's not worth re-inventing
// the wheel. This code allows for cleaner HTML code generation for the chat
// messages.
LootManager._h = {
    outer: (...o) => `<div style="border: 1px solid black; background-color: white; padding: 3px 3px;">${o.join(' ')}</div>`,
    title: (t,v) => `<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">${t} v${v}</div>`,
    subhead: (...o) => `<b>${o.join(' ')}</b>`,
    minorhead: (...o) => `<u>${o.join(' ')}</u>`,
    hr: () => `<hr/>`,
    optional: (...o) => `${LootManager.ch('[')}${o.join(` ${LootManager.ch('|')} `)}${LootManager.ch(']')}`,
    required: (...o) => `${LootManager.ch('<')}${o.join(` ${LootManager.ch('|')} `)}${LootManager.ch('>')}`,
    header: (...o) => `<div style="padding-left:10px;margin-bottom:3px;">${o.join(' ')}</div>`,
    section: (s,...o) => `${LootManager._h.subhead(s)}${_h.inset(...o)}`,
    paragraph: (...o) => `<p>${o.join(' ')}</p>`,
    items: (o) => o.map(i=>`<li>${i}</li>`).join(''),
    ol: (...o) => `<ol>${LootManager._h.items(o)}</ol>`,
    ul: (...o) => `<ul>${LootManager._h.items(o)}</ul>`,
    row_items: (o) => o.map(i=>`<td>${i}</td>`).join(''),
    rows: (o) => o.map(i=>`<tr>${LootManager._h.row_items(i)}</tr>`).join(''),
    table: (o) => `<table>${LootManager._h.rows(o)}</table>`,
    grid: (...o) => `<div style="padding: 12px 0;">${o.join('')}<div style="clear:both;"></div></div>`,
    cell: (o) =>  `<div style="width: 130px; padding: 0 3px; float: left;">${o}</div>`,
    inset: (...o) => `<div style="padding-left: 10px;padding-right:20px">${o.join(' ')}</div>`,
    join: (...o) => o.join(' '),
    pre: (...o) =>`<div style="border:1px solid #e1e1e8;border-radius:4px;padding:8.5px;margin-bottom:9px;font-size:12px;white-space:normal;word-break:normal;word-wrap:normal;background-color:#f7f7f9;font-family:monospace;overflow:auto;">${o.join(' ')}</div>`,
    preformatted: (...o) =>_h.pre(o.join('<br>').replace(/\s/g,LootManager.ch(' '))),
    code: (...o) => `<code>${o.join(' ')}</code>`,
    attr: {
        bare: (o)=>`${LootManager.ch('@')}${LootManager.ch('{')}${o}${LootManager.ch('}')}`,
        selected: (o)=>`${LootManager.ch('@')}${LootManager.ch('{')}selected${LootManager.ch('|')}${o}${LootManager.ch('}')}`,
        target: (o)=>`${LootManager.ch('@')}${LootManager.ch('{')}target${LootManager.ch('|')}${o}${LootManager.ch('}')}`,
        char: (o,c)=>`${LootManager.ch('@')}${LootManager.ch('{')}${c||'CHARACTER NAME'}${LootManager.ch('|')}${o}${LootManager.ch('}')}`
    },
    bold: (...o) => `<b>${o.join(' ')}</b>`,
    italic: (...o) => `<i>${o.join(' ')}</i>`,
    font: {
        command: (...o)=>`<b><span style="font-family:serif;">${o.join(' ')}</span></b>`
    },
    ui : {
        float: (t) => `<div style="display:inline-block;float:right">${t}</div>`,
        clear: () => `<div style="clear:both;"></div>`,
        bubble: (label) => `<span style="display:inline-block;border:1px solid #999; border-radius: 1em; padding: .1em 1em; font-weight:bold; background-color: #009688;color:white">${label}</span>`,
        button: (label,link) => `<a href="${link}">${label}</a>`
    }
}; // end _h

LootManager.displayOffers = (player_id, character, offers) => {
    var offerManager = new LootManager.class.OfferManagerClass();
    var _h = LootManager._h;
    var offer_message_strings = [];

    if (!(Array.isArray(offers))) {
        offers = [offers];
    }

    _.each(offers, function (offer) {
        var offer_id = offer.getID();
        var price = offer.getPrice();
        var item = offer.getItem();
        var quantity = item.getQuantity();
        var offered_by = getObj('character', item.getCharacterID());
        var offer_active = offerManager.isOfferActive(offer);
        var price_string = '';
        var offer_descriptors = [];
        var buttons = [[_h.ui.button('Inspect Item', `!loot-manager show item ${offer_id}`)]];

        offer_descriptors.push(
            _h.join(_h.bold('Quantity'), _h.italic(quantity))
        );

        if (offered_by !== undefined) {
            offered_by = offered_by.get('name');
            offer_descriptors.push(
                _h.join(_h.bold('Offered By'), _h.italic(offered_by))
            );
        }

        if (price !== undefined) {
            var price_strings = [];
            _.each(price, function (currency_obj) {
                price_strings.push(currency_obj.toString());
            });
            if (price_strings.length > 0) {
                price_string = price_strings.join(', ');
                offer_descriptors.push(
                    _h.join(_h.bold('Price'), _h.italic(price_string))
                );
            }
        }

        if (playerIsGM(player_id)) {
            var target_ids = offer.getTargetIDs();
            if (target_ids.length > 0) {
                offer_descriptors.push(
                    _h.join(
                        _h.bold('Visible To'),
                        _h.ul(
                            ...target_ids
                        )
                    )
                );
            }
        }

        if (item instanceof LootManager.class.InventoryItemClass) {
            var offer_claim_buttons = [];
            offer_claim_buttons.push(_h.ui.button('Claim 1', `!loot-manager claim item --quantity 1 ${offer_id}`));
            if (item.getQuantity() > 9) {
                offer_claim_buttons.push(_h.ui.button('Claim 10', `!loot-manager claim item --quantity 10 ${offer_id}`));
            }
            if (item.getQuantity() > 99) {
                offer_claim_buttons.push(_h.ui.button('Claim 100', `!loot-manager claim item --quantity 100 ${offer_id}`));
            }
            if (item.getQuantity() > 1) {
                offer_claim_buttons.push(_h.ui.button(`Claim All (${item.getQuantity()})`, `!loot-manager claim item --quantity ${item.getQuantity()} ${offer_id}`));
            }
            buttons.push(offer_claim_buttons);
        }
        else if (item instanceof LootManager.class.CurrencyClass) {
            var offer_claim_buttons = [];
            offer_claim_buttons.push(_h.ui.button('Claim 1', `!loot-manager claim currency --quantity 1 ${offer_id}`));
            if (item.getQuantity() > 9) {
                offer_claim_buttons.push(_h.ui.button('Claim 10', `!loot-manager claim currency --quantity 10 ${offer_id}`));
            }
            if (item.getQuantity() > 99) {
                offer_claim_buttons.push(_h.ui.button('Claim 100', `!loot-manager claim currency --quantity 100 ${offer_id}`));
            }
            if (item.getQuantity() > 1) {
                offer_claim_buttons.push(_h.ui.button(`Claim All (${item.getQuantity()})`, `!loot-manager claim currency --quantity ${item.getQuantity()} ${offer_id}`));
            }
            buttons.push(offer_claim_buttons);
        }

        if (playerIsGM(player_id) || (character.get('id') === item.getCharacterID() && offer_active)) {
            buttons.push(
                [
                    _h.ui.button('Drop Offer', `!loot-manager drop ${offer_id}`),
                    _h.ui.button('Recall Offer', `!loot-manager recall ${offer_id}`)
                ]
            );
        }

        if (playerIsGM(player_id)) {
            if (offer_active) {
                if (offer.isHidden()) {
                    buttons.push(
                        [
                            _h.ui.button('Unhide Offer', `!loot-manager make offer visible ${offer_id}`)
                        ]
                    );
                }
                else {
                    buttons.push(
                        [
                            _h.ui.button('Hide Offer', `!loot-manager make offer hidden ${offer_id}`)
                        ]
                    );
                }
            }
        }

        offer_message_strings.push(
            _h.outer(
                _h.outer(_h.subhead(`Offer ID: ${offer_id}`)),
                _h.inset(
                    _h.ui.bubble(item.getName()),
                    _h.ul(
                        ...offer_descriptors
                    ),
                    _h.table(buttons),
                )
            )
        );
    });

    LootManager.showMessage(player_id, _h.join(offer_message_strings));
}; // end displayOffers

LootManager.displayHistory = (player_id, offers) => {
    var _h = LootManager._h;
    var offer_message_strings = [];

    if (!(Array.isArray(offers))) {
        offers = [offers];
    }

    _.each(offers, function (offer) {
        var offer_id = offer.getID();
        var offer_history = offer.getHistory();

        offer_message_strings.push(
            _h.outer(
                _h.outer(_h.subhead(`Offer ID: ${offer_id}`)),
                _h.inset(
                    _h.ul(
                        ...offer_history
                    )
                )
            )
        );
    });

    LootManager.showMessage(player_id, _h.join(offer_message_strings));
}; // end displayHistory

LootManager.displayItems = (player_id, items) => {
    var message = [];
    var _h = LootManager._h;
    if (!(Array.isArray(items))) {
        items = [items];
    }

    _.each(items, function (item) {
        message.push(item.getOfferDisplay());
    });

    LootManager.showMessage(player_id, _h.join(message));
}; // end displayItems

LootManager.displayItemsForOffer = (player_id, items) => {
    var _h = LootManager._h;
    var item_offer_strings = [];

    if (!(Array.isArray(items))) {
        items = [items];
    }

    _.each(items, function (item) {
        var name = item.getName();
        var quantity = item.getQuantity();
        var offer_buttons = [];

        if (item instanceof LootManager.class.InventoryItemClass) {
            offer_buttons.push(
                _h.ui.button('Offer 1', `!loot-manager make offer item ${name}`)
            );
            if (quantity > 1) {
                offer_buttons.push(
                    _h.ui.button(`Offer All (${quantity})`, `!loot-manager make offer item ${name} --all`)
                );
            }
        }
        else {
            var singular = item.getUnit();
            var plural = item.getUnit(true);
            offer_buttons.push(
                _h.ui.button('Offer 1', `!loot-manager make offer currency --quantity 1 ${singular}`)
            )
            if (quantity > 9) {
                offer_buttons.push(
                    _h.ui.button('Offer 10', `!loot-manager make offer currency --quantity 10 ${plural}`)
                )
            }
            if (quantity > 99) {
                offer_buttons.push(
                    _h.ui.button('Offer 100', `!loot-manager make offer currency --quantity 100 ${plural}`)
                )
            }
            offer_buttons.push(
                _h.ui.button(`Offer All (${quantity})`, `!loot-manager make offer currency --quantity ${quantity} ${plural}`)
            )
        }

        item_offer_strings.push(
            _h.outer(
                _h.outer(_h.subhead(name)),
                _h.inset(
                    _h.ul(
                        _h.join(_h.bold('Quantity'), _h.italic(quantity))
                    ),
                    _h.table([offer_buttons]),
                )
            )
        );
    });

    LootManager.showMessage(player_id, _h.join(item_offer_strings));
}; // end displayItemsForOffer

LootManager.checkInstall = () => {
    var script_name = LootManager.script_name;
    var version = LootManager.version;
    var version_string = version.toString();
    var last_update = LootManager.last_update;
    var schema_version = LootManager.schema_version;
    var schema_version_string = schema_version.toString();

    log(`-=> ${script_name} v${version_string} <=-  [${new Date(last_update*1000)}]`);

    if( ! _.has(state,script_name) || state[script_name].schema_version !== schema_version) {
        log(`  > Updating Schema to v${schema_version_string} <`);
        state[script_name] = {};
        switch(state[script_name] && state[script_name].schema_version) {
            case 0.2:
                state[script_name]['config']['convert_currency'] = true;
                /* break; // intentional dropthrough */ /* falls through */
            case 'UpdateSchemaVersion':
                state[script_name]['schema_version'] = schema_version;
                break;
            default:
                state[script_name] = {
                    version: version,
                    schema_version: schema_version,
                    config: {
                        convert_currency: true
                    },
                    offers: {},
                    previous_offers: {}
                };
                break;
        }
    }
}; // end checkInstall

LootManager.registerEventHandlers = () => {
    on('chat:message', LootManager.handleInput);
};

on("ready",() => {
    LootManager.checkInstall();
    LootManager.registerEventHandlers();
});
