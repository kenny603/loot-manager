// Author: Ken Benoit
// Last updated: 2020-09-14

var LootManagerStarfinderPlugin = LootManagerStarfinderPlugin || {};

LootManagerStarfinderPlugin.script_name        = "LootManagerStarfinderPlugin";
LootManagerStarfinderPlugin.plugin_destination = "LootManagerPlugin";
LootManagerStarfinderPlugin.version            = 0.2;
LootManagerStarfinderPlugin.last_update        = 1600077071;
LootManagerStarfinderPlugin.schema_version     = 0.1;

LootManagerStarfinderPlugin.class = {
    LootManagerStarfinderPluginClass: class StarfinderTranslator extends LootManager.class.InventoryTranslatorClass {
        constructor() {
            super();
            this._item_field_mapper = {
                prefix: 'repeating_item_',
                suffix: {
                    item_name: {
                        field: {
                            name: '_name',
                            default: 'Default'
                        }
                    },
                    quantity: {
                        field: {
                            name: '_quantity',
                            default: 1,
                            type: 'int'
                        }
                    },
                    bulk: {
                        field: {
                            name: '_bulk',
                            default: ''
                        }
                    },
                    cost: {
                        field: {
                            name: '_cost',
                            default: 0,
                            type: 'int'
                        }
                    },
                    level: {
                        field: {
                            name: '_level',
                            default: 1,
                            type: 'int'
                        }
                    },
                    purpose: {
                        field: {
                            name: '_purpose',
                            default: 'equipment'
                        }
                    },
                    armor_type: {
                        field: {
                            name: '_type',
                        }
                    },
                    item_uses: {
                        field: {
                            name: '_uses',
                            default: 0,
                            type: 'int'
                        }
                    },
                    item_uses_max: {
                        field: {
                            name: '_uses_max',
                            default: 0,
                            type: 'int'
                        }
                    },
                    item_mods: {
                        field: {
                            name: '_mods',
                            default: ''
                        }
                    },
                    item_description: {
                        field: {
                            name: '_description',
                            default: ''
                        }
                    },
                    item_attacher: {
                        field: {
                            name: '_attacher',
                            default: ''
                        }
                    },
                    item_usage: {
                        field: {
                            name: '_usage',
                            default: ''
                        }
                    },
                    item_special: {
                        field: {
                            name: '_special',
                            default: ''
                        }
                    },
                    item_show_options: {
                        field: {
                            name: '_show_options',
                            copy: false
                        }
                    },
                    item_proficiency: {
                        field: {
                            name: '_proficiency',
                            copy: false
                        }
                    }
                }
            };

            this._attack_field_mapper = {
                prefix: 'repeating_attack_',
                suffix: {
                    attack_name: {
                        field: {
                            name: '_name',
                            default: 'Default'
                        }
                    },
                    attack_ability: { // ability mod attribute field
                        field: {
                            name: '_ability',
                        }
                    },
                    additional_attack_bonus: { // additional attack bonus
                        field: {
                            name: '_bonus',
                            default: ''
                        }
                    },
                    attack_range: { // ranged weapon distance
                        field: {
                            name: '_range',
                            default: ''
                        }
                    },
                    attack_engagement_range: { // melee or ranged
                        field: {
                            name: '_engagement_range',
                            default: ''
                        }
                    },
                    attack_damage_dice: { // damage dice notation
                        field: {
                            name: '_damage_dice',
                            default: ''
                        }
                    },
                    attack_damage_ability: { // 0 if n/a, otherwise ability mod attribute field for damage
                        field: {
                            name: '_damage_ability',
                            default: 0
                        }
                    },
                    attack_damage_type: { // damage type (b/p/s/e/f, etc)
                        field: {
                            name: '_type',
                            default: ''
                        }
                    },
                    attack_crit_effect: { // crit effect
                        field: {
                            name: '_crit',
                            default: ''
                        }
                    },
                    attack_ammo_type: {
                        field: {
                            name: '_ammo_type',
                            default: ''
                        }
                    },
                    attack_ammo: { // current ammo count
                        field: {
                            name: '_ammo',
                            default: 0,
                            type: 'int'
                        }
                    },
                    attack_ammo_max: { // max ammo count (uses the same ammo field, but the max value)
                        field: {
                            name: '_ammo',
                            default: 0,
                            max: true,
                            type: 'int'
                        }
                    },
                    attack_ammo_usage: { // ammo usage per shot
                        field: {
                            name: '_usage',
                            default: ''
                        }
                    },
                    attack_special_traits: { // any special traits (analog, etc)
                        field: {
                            name: '_special',
                            default: ''
                        }
                    },
                    attack_category: { // basic_melee, advanced melee, etc
                        field: {
                            name: '_category',
                        }
                    },
                    attack_proficiency: {
                        field: {
                            name: '_proficiency',
                            copy: false
                        }
                    },
                    attack_description: {
                        field: {
                            name: '_description',
                            default: ''
                        }
                    },
                    attack_attacher: {
                        field: {
                            name: '_attacher',
                            default: ''
                        }
                    },
                    attack_level: {
                        field: {
                            name: '_level',
                            default: ''
                        }
                    },
                    attack_base_attack_bonus: {
                        field: {
                            name: '_base_attack_bonus',
                            copy: false
                        }
                    },
                    attack_misc: {
                        field: {
                            name: '_misc',
                            default: ''
                        }
                    },
                    attack_total_change: {
                        field: {
                            name: '_total_change',
                            copy: false
                        }
                    },
                    attack_total: {
                        field: {
                            name: '_total',
                            copy: false
                        }
                    },
                    attack_damage_misc: {
                        field: {
                            name: '_damage_misc',
                            default: ''
                        }
                    },
                    attack_damage_total_change: {
                        field: {
                            name: '_damage_total_change',
                            copy: false
                        }
                    },
                    attack_damage_total: {
                        field: {
                            name: '_damage_total',
                            copy: false
                        }
                    },
                    attack_damage_proficiency_value: {
                        field: {
                            name: '_damage_proficiency_value',
                            copy: false
                        }
                    },
                    attack_proficiency_value: {
                        field: {
                            name: '_proficiency_value',
                            copy: false
                        }
                    },
                    attack_show_options: {
                        field: {
                            name: '_show_options',
                            copy: false
                        }
                    }
                }
            };

            this._currency_definitions = {
                credits: {
                    field: 'credits',
                    singular: 'credit',
                    plural: 'credits',
                    default: 0,
                    type: 'int'
                },
                upbs: {
                    field: 'upb',
                    singular: 'UPB',
                    plural: 'UPBs',
                    default: 0,
                    type: 'int'
                }
            };
        } // end constructor

        _generateTemplate(kwargs) {
            const _h = {
                template: (kwargs) => `<div style="width:85%;">${_h.header(kwargs.title)} ${_h.body(kwargs.content, kwargs.notes)} ${_h.footer(kwargs.name)}</div>`,
                header: (o) => `<div style="${_h.style.header_box()}"><div style="${_h.style.header()}">${o}</div></div>`,
                footer: (o) => `<div style="${_h.style.footer_box()}"><div style="${_h.style.footer()}">${o}</div></div>`,
                body: (content, notes) => {
                    var body = '';
                    if (notes === undefined || notes.length < 1) {
                        body = `<div style="${_h.style.body()}">${_h.split_container(content)}</div>`;
                    }
                    else {
                        body = `<div style="${_h.style.body()}">${_h.split_container(content)} ${_h.notes_row(notes)}</div>`;
                    }
                    return body;
                },
                split_container: (o) => o.map(i=>`<div style="${_h.style.split_container()}"><div style="${_h.style.split_left()}"><div style="${_h.style.scrollable()}">${i[0]}</div></div><div style="${_h.style.split_right()}"><div style="${_h.style.scrollable()}">${i[1]}</div></div></div>`).join(''),
                notes_row: (o) => `<div style="${_h.style.notes_container()}"><div style="${_h.style.notes_row()}">NOTES</div><div style="${_h.style.notes_row()}"><div style="${_h.style.scrollable()}">${o}</div></div></div>`,
                style: {
                    header_box: () => `display:inline-block; position:relative; bottom:-5px; left:2px; float:left;`,
                    footer_box: () => `display:inline-block; position:relative; top:-5px; right:-18px; float:right;`,
                    header_footer: () => `text-transform:uppercase; font-weight:normal; text-align:center; letter-spacing:0px; margin-bottom:0px; font-family:Contrail One; color:white; max-width:100%; font-size:13pt; padding:1px 10px 1px 10px; background-color:#1F5178; border:1px solid #42C4FF;`,
                    header: () => `${_h.style.header_footer()}`,
                    footer: () => `${_h.style.header_footer()} font-style:italic;`,
                    body: () => `width:100%; color:black; font-family:Lucida Console,Monaco; border: 10px solid black; background-color:black; display:table;`,
                    split_container: () => `display:table-row;`,
                    notes_container: () => `display:table-row;`,
                    grid_box: () => `padding:10px; background-color:white; box-shadow:0px 0px 15px 3px inset black; border:1px solid #66D8FA; display:table-cell;`,
                    split_left: () => `${_h.style.grid_box()} width: 50%;`,
                    split_right: () => `${_h.style.grid_box()} width: 50%;`,
                    notes_row: () => `${_h.style.grid_box()} width:50%;`,
                    scrollable: () => `max-height:200px; overflow-y:auto; overflow-x:hidden;`
                }
            };

            kwargs['title'] = kwargs['title'].replace(/\n/g, '<br/>');
            kwargs['name'] = kwargs['name'].replace(/\n/g, '<br/>');
            if (kwargs['notes']) {
                kwargs['notes'] = kwargs['notes'].replace(/\n/g, '<br/>');
            }
            if (kwargs['content'] === undefined) {
                kwargs['content'] = [];
            }

            return _h.template(kwargs);
        } // end _generateTemplate

        _generateWeaponSpecialTraitsLinks (special_traits_string) {
            var self = this;
            var special_trait_info = {
                'aeon': {
                    tooltip: "A weapon that has the aeon special property includes a socket that can house an aeon stone. As a standard action, you can slot an aeon stone into the socket or remove it. You can slot an aeon stone into a weapon only if the weapon has an item level equal to or greater than the aeon stone’s item level. The amount of the boost’s damage increase is dependent on the item level of the slotted aeon stone, as follows: level 1–5, 1d4; levels 6–10, 1d6; levels 11–15, 1d8; levels 16–20, 1d10. (More info in link)",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Aeon"
                },
                'analog': {
                    tooltip: "This weapon does not use any advanced electronics, computer systems, or electrical power sources. It is immune to abilities that target technology. While this use of the word “analog” is not technically correct when referring to technology, use of the term in this way has become common throughout the Pact Worlds.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Analog"
                },
                'antibiological': {
                    tooltip: "An antibiological weapon damages only living targets. Objects and creatures with the unliving special quality, such as robots and undead, are immune to its effects.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Antibiological"
                },
                'archaic': {
                    tooltip: "This weapon deals 5 fewer damage unless the target is wearing no armor or archaic armor. Archaic weapons are made of primitive materials such as wood or common steel.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Archaic"
                },
                'aurora': {
                    tooltip: "When an aurora weapon strikes a target, the creature glows with a soft luminescence for 1 minute. This negates invisibility effects and makes it impossible for the target to gain concealment from or hide in areas of shadow or darkness.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Aurora"
                },
                'automatic': {
                    tooltip: "In addition to making ranged attacks normally, a weapon with this special property can fire in fully automatic mode. When you make a full attack with a weapon in automatic mode, you can attack in a cone with a range of half the weapon’s range increment. This uses all the weapon’s remaining ammunition. Roll one attack against each target in the cone, starting with those closest to you. Attacks made with a weapon in automatic mode can’t score critical hits. Roll damage only once, and apply it to all targets struck. Attacks in automatic mode take the same penalties as other full attacks. (More info in link)",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Automatic"
                },
                'blast': {
                    tooltip: "This weapon fires in a cone that extends only to its first range increment. You can’t use it to attack creatures beyond that range. For each attack you make with a weapon with the blast special property, roll one attack against each target in the cone, starting with those closest to you. Each attack takes a –2 penalty in addition to other penalties, such as the penalty to all attacks during a full attack. Roll damage only once for all targets. If you roll one or more critical hits, roll the extra critical damage only once (or any other special effects on a critical hit that require you to roll) and apply it to each creature against which you score a critical hit. (More info in link)",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Blast"
                },
                'block': {
                    tooltip: "Only melee weapons can have the block special property, which represents some kind of guard or crossbar that can protect you from attacks by a foe you strike in melee. When you successfully strike a target with a melee attack using such a weapon, you gain a +1 enhancement bonus to your AC for 1 round against melee attacks from that target.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Block"
                },
                'boost': {
                    tooltip: "You can charge up a weapon with this special property as a move action. When you do, you increase the weapon’s damage by the listed amount on the next attack you make with the weapon. Boosting expends charges from the weapon equal to its usage value. This increases the weapon’s damage and is multiplied on a critical hit. Boosting a weapon more than once before firing it doesn’t have any extra effect, and the extra charge dissipates if the weapon is not fired by the end of your next turn.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Boost"
                },
                'breach': {
                    tooltip: "A breach weapon is specifically designed to apply sudden force to doors and walls in an effort to break them. If you are trained in Engineering, as a full action you can use a breach weapon against an adjacent stationary door or wall, or at the GM’s discretion, against a similar adjacent object. An attack with the weapon expends ammunition as normal, but instead of making an attack roll, you attempt a Strength check against the object’s break DC (Core Rulebook 408) and add the breach weapon’s item level to the check.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Breach"
                },
                'breakdown': {
                    tooltip: "A breakdown weapon can be taken apart into multiple small pieces. While broken down, the weapon is treated as especially small or easy to hide for the purpose of Sleight of Hand’s hide object task and can fit into spaces that can typically hold only items of light bulk (including a ysoki’s cheek pouches). It takes 1 minute to take apart or reassemble a breakdown weapon.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Breakdown"
                },
                'bright': {
                    tooltip: "Attacks with bright weapons illuminate the area within 20 feet of you and your target for 1 round following the attack, increasing the illumination level by one step, to a maximum of normal light.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Bright"
                },
                'cluster': {
                    tooltip: "A cluster weapon is a form of grenade launcher that can fire a single grenade or (if loaded with appropriate grenades) can expend two identical grenades as a single attack. In the latter case, the grenades act as a single grenade of the same type (with a single attack roll, dealing damage only once, and so on), except its radius is increased by the listed amount listed and the save DC of any effects created by the grenade is calculated using the cluster weapon’s item level if it is higher than the grenade’s item level. Attempting to fire two nonidentical grenades results in an error code and the weapon does not fire.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Cluster"
                },
                'conceal': {
                    tooltip: "A weapon with the conceal special property is considered especially small or easy to hide for purposes of Slight of Hand’s hide object task, granting you a +4 circumstance bonus to skill checks to hide object.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Conceal"
                },
                'deconstruct': {
                    tooltip: "The target of a weapon with the deconstruct special property takes the listed amount of acid damage every round until the target succeeds at a Reflex save to end the damage. This functions as the burning condition, except as noted and that the ongoing damage is also ended if the target takes any amount of electricity damage.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Deconstruct"
                },
                'deflect': {
                    tooltip: "A weapon with the deflect special property generates both an energy and a kinetic effect, which allows you to use it with the Deflect Projectiles feat (if you have it) to counter both kinetic and energy ranged attacks.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Deflect"
                },
                'disarm': {
                    tooltip: "When you attempt a disarm combat maneuver while wielding a weapon with the disarm special property, you gain a +2 bonus to your attack roll.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Disarm"
                },
                'double': {
                    tooltip: "A double weapon has two different weapons placed end to end so you can attack with either easily without changing your grip. For the purpose of the Multi-Weapon Fighting feat, a double weapon is treated as two or more operative melee weapons. A double weapon is not treated as an operative weapon for any other purpose unless it has the operative weapon special property. (More info in link)",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Double"
                },
                'drain charge': {
                    tooltip: "When a weapon with the drain charge weapon special property hits an enemy that has a natural attack that deals electricity damage (an attack not dependent on armor upgrades, spells, spell-like abilities, or carried weapons or equipment), it siphons off some of that target’s inherent electricity and regains the number of charges listed in the weapon’s usage entry.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Drain%20Charge"
                },
                'echo': {
                    tooltip: "An echo weapon establishes a lingering sonic resonance within a target. A creature with blindsense or blindsight (vibration or sound) can detect a target hit by an echo weapon at a distance of up to 10 × its normal range. This does not grant blindsense or blindsight to creatures that do not already have this ability.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Echo"
                },
                'entangle': {
                    tooltip: "A creature hit by an entangle weapon becomes entangled until it escapes with an Acrobatics check (DC = 10 + weapon’s item level + the attacker’s Dexterity modifier) or a Strength check (DC = 15 + weapon’s item level + the attacker’s Dexterity modifier). An entangled creature can attempt such a check as a move action. Some weapons (such as stickybomb grenades) have a maximum duration for this effect. See page 275 for information about the entangled condition.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Entangle"
                },
                'explode': {
                    tooltip: "Explosives have the explode special property, which lists the amount of damage the explosion deals, the damage type, special effects (with a duration, if necessary), and the radius of the explosion. When you attack with this type of weapon or ammunition, aim at a grid intersection. Each creature within the blast radius takes the listed damage but can attempt a Reflex saving throw for half damage. If the explode special property has any special effects other than damage, they are negated with a successful saving throw. Some exploding weapons, such as smoke grenades, don’t deal damage, so they don’t include the damage and damage type entries.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Explode"
                },
                'extinguish': {
                    tooltip: "You can expend all remaining charges of this weapon (even if it has only a single charge or use) as a swift action to remove the burning condition from yourself or an adjacent creature, or to quench the flames in 1 square. If the weapon affects an area, it extinguishes all flames in that area (including ending the burning condition for all targets fully within the area). Extinguishing flames does not prevent the area from catching fire again, especially if flames survive nearby.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Extinguish"
                },
                'feint': {
                    tooltip: "When using this weapon to feint (Core Rulebook 247), you gain a +2 circumstance bonus to your Bluff check.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Feint"
                },
                'fiery': {
                    tooltip: "Fiery ammunition bursts into glowing embers when fired. While this is not enough to change its normal damage to fire damage, any extra damage from a critical hit is considered fire damage and the weapon deals half damage to targets that take half damage from energy attacks but no damage from kinetic attacks (such as incorporeal creatures) and counts as a weapon with the explode special property against creatures with swarm defenses. If fiery ammunition is used in a weapon that already deals half fire damage (such as a weapon with the flaming weapon fusion), on a critical hit, all the damage dealt is fire damage. At the GM’s discretion, fiery ammunition can set extremely flammable materials on fire, such as oil-soaked rags or dry tinder.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Fiery"
                },
                'first arc': {
                    tooltip: "A weapon with the first arc special property always generates an electrical arc, per the critical hit effect whenever it hits a target.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=First%20Arc"
                },
                'flexible line': {
                    tooltip: "A flexible weapon generates lines of effect at a distance from the user. Choose two points, both of which must be within the weapon’s first range increment. The weapon’s effect extends from one point to the other. Other than this placement, resolve the attack per the line weapon special property.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Flexible%20Line"
                },
                'force': {
                    tooltip: "A force weapon is treated as having the force descriptor, which can cause it to interact differently with some targets (as defined by the targets’ special rules). Force weapons deal kinetic damage but still target EAC.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Force"
                },
                'free hands': {
                    tooltip: "A free hands weapon is unbalanced or otherwise awkward to use. This difficulty in using the weapon can be negated by moving the listed number of hands that are not holding anything or being used for any other purpose as counterweights. You wield a free hands weapon using the normal number of hands, but if you have the listed number of free hands available while wielding it, the weapon is not considered unwieldy. For example, a kasatha wielding a flame spinner in two of her hands while her other two hands remain empty treats the weapon as though it does not have the unwieldy weapon special property.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Free%20Hands"
                },
                'fueled': {
                    tooltip: "A fueled weapon has an integrated petrol tank and must be activated to function properly. This works like the powered weapon special property, except it uses petrol as a fuel source instead of a battery. Unlike a battery, petrol is permanently expended upon use and must be purchased rather than recharged.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Fueled"
                },
                'grapple': {
                    tooltip: "When wielding a grapple weapon, you can use it to perform a grapple combat maneuver without having your hands free. When you do so, you gain a +2 bonus to the attack roll, and if you roll a natural 20 on the attack roll, you apply the weapon’s critical hit effect (if any) to the target.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Grapple"
                },
                'gravitation': {
                    tooltip: "When you hit a target with a gravitation weapon, you can move that target the listed distance either toward you or away from you unless it succeeds at a Reflex save (DC = 10 + 1/2 weapon’s item level + your Dexterity bonus). If this movement would cause the target to move through a wall, object, or another barrier, the target creature stops moving, but it does not fall prone or take damage. If the movement would push the target off a cliff, into a trap, or otherwise move it into an area of obvious danger, the target must succeed at a second Reflex saving throw to stop its movement or be moved into the dangerous space. Movement caused by a gravitation weapon does not trigger attacks of opportunity.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Gravitation"
                },
                'guided': {
                    tooltip: "A guided weapon uses a signal along with wireless telemetry, magnetic guidance, or another means of guiding its payload after the weapon has been fired. When you take a move action to aim the weapon and then fire it on the same turn (including doing so with a sniper weapon), your target does not gain the bonus to AC provided by cover, partial cover, or soft cover. Improved cover and total cover still confer their bonuses normally.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Guided"
                },
                'harrying': {
                    tooltip: "A harrying weapon produces exceptionally distracting bursts of fire. When you take the harrying fire action with this weapon, you gain a +2 insight bonus to your attack roll.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Harrying"
                },
                'holy water': {
                    tooltip: "A holy water weapon is infused with the blessings of one or more good-aligned deities (most commonly Hylax, Iomedae, or Sarenrae within the Pact Worlds, though devoted followers of any good-aligned deity could create such weapons). It damages only undead (regardless of alignment) and outsiders with the evil subtype, and even those creatures suffer no effect (and show no sign of their nature if it is not already obvious) with a successful saving throw. Crafting a holy water grenade requires the blessing of formally trained priests of a good deity, though a character of any alignment can do the actual crafting.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Holy%20Water"
                },
                'ignite': {
                    tooltip: "Weapons with the ignite special property use an accelerant to start small, intense fires on their targets. A target hit by a weapon with this special property must succeed at a Reflex save (DC = 20 + 1/2 the item’s level + your Dexterity bonus) or gains the burning condition with the listed amount of damage. Gaining the burning condition multiple times from the ignite special property does not increase your burning damage—you take only the highest listed ignite damage each round. A character who gains the burning condition through other means (such as the burn critical effect, even from a weapon with ignite) does add that damage to her burning damage each round. Ending the burning condition ends burning from all sources.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Ignite"
                },
                'indirect': {
                    tooltip: "An indirect weapon uses a wireless signal along with a multistage firing system, internal telemetry, bimetallic fluctuation, magnetic guidance, or some other system to make it appear as if a shot from the weapon had been fired from a different location. This reduces the penalty to Stealth checks for sniping by 10.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Indirect"
                },
                'injection': {
                    tooltip: "This weapon or its ammunition can be filled with a drug, an injury poison, or a medicinal compound. On a successful attack with the weapon (either the first attack if it’s a melee weapon or an attack with the relevant piece of ammunition if it’s a ranged weapon), the weapon automatically injects the target with the substance. Refilling the weapon with a new substance acts as reloading it and is a move action. Each different injectable material must be bought separately and can be used in any weapon with the injection special property. See page 231 for rules and prices for drugs, medicinals, and poisons.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Injection"
                },
                'integrated': {
                    tooltip: "An integrated weapon can be wielded normally or installed in an armor upgrade slot. When properly installed, the weapon is considered to be wielded without needing to assign a number of hands to wield it. An integrated weapon requires the listed number of armor slots for proper installation. An android or any other creature with the upgrade slot racial ability cannot combine its racial upgrade slot with armor upgrade slots to install an integrated weapon. Installing, removing, or replacing an integrated weapon in a suit of armor takes 10 minutes, as if it were an armor upgrade.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Integrated"
                },
                'line': {
                    tooltip: "This weapon fires a projectile in a straight line that pierces through multiple creatures or obstacles. When attacking with such a weapon, make a single attack roll and compare it to the relevant Armor Class of all creatures and objects in a line extending to the weapon’s listed range increment. Roll damage only once. The weapon hits all targets with an AC equal to or lower than the attack roll. However, if an attack fails to damage a creature or obstacle hit in the line (typically due to damage reduction or hardness), the path is stopped and the attack doesn’t damage creatures farther away. (More info in link)",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Line",
                    conflicts: ['flexible line', 'wide line']
                },
                'living': {
                    tooltip: "Unlike simpler forms of biotech, a living weapon is not just organic material—it’s actually a simple living organism. The core function of a living weapon is based on the same scientific principles as manufactured weapons, but come about as part of its natural development and body function. A living weapon can be affected by spells that target creatures, though it is mindless, incapable of independent action, and has no ability scores other than Constitution (which is always equal to its item level). (More info in link)",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Living"
                },
                'lockdown': {
                    tooltip: "A construct reduced to 0 Hit Points by a lockdown weapon is not destroyed but simply immobilized until it regains 1 or more Hit Points.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Lockdown"
                },
                'mind-affecting': {
                    tooltip: "A mind-affecting weapon affects only creatures with minds; targets that are immune to mind-affecting effects are immune to this weapon. The damage from mind-affecting weapons is normally untyped, in which case it is affected by the same things that affect damage from the spell mind thrust. For example, if a creature was immune to mind thrust, it would also be immune to untyped damage from a mind-affecting weapon.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Mind-Affecting"
                },
                'mine': {
                    tooltip: "A weapon with the mine special property is able to modify the ammunition fired from it to delay the detonation of its ordnance. Ammunition fired from this weapon (typically a grenade or mini-rocket) lands at the target grid intersection intact, detonating only when a creature moves into an adjacent square, or automatically detonating after 1d6+1 rounds have passed.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Mine"
                },
                'mire': {
                    tooltip: "A mire weapon has a defined area (generally a radius) that it temporarily turns into difficult terrain. Only a surface can be turned into difficult terrain (you can’t use a mire weapon to create difficult terrain in midair, for example), and the difficult terrain affects only the climb speed and land speed of creatures in the area.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Mire"
                },
                'modal': {
                    tooltip: "A modal weapon can be toggled to deal different types of damage, with the options listed in the weapon’s damage entry. The weapon can deal only one type of damage at a time; changing the weapon’s mode to deal another damage type requires a move action. The weapon category of a modal weapon is based on the first damage type listed. If its second damage type causes it to be considered a different category of weapon when dealing that damage, that category is listed in parentheses. For example, a modal weapon in the flame category that deals 1d6 fire damage or 1d6 cold damage lists “modal (cryo)” to indicate that when it is used to deal cold damage, it is treated as a weapon in the cryo category.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Modal"
                },
                'necrotic': {
                    tooltip: "A necrotic weapon deals cold damage infused with negative energy. Creatures immune to negative energy (such as the targets of a death ward spell) are immune to the cold damage of a necrotic weapon, and the cold damage of necrotic weapons affects only living creatures. Undead creatures targeted by a weapon with this property not only take no damage from the cold but also gain temporary Hit Points equal to the weapon’s item level. These temporary Hit Points last for 10 minutes, until expended, or until the undead gains a larger number of temporary Hit Points from a necrotic weapon. A creature can benefit from only one source of temporary Hit Points from a necrotic weapon at a time.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Necrotic"
                },
                'nonlethal': {
                    tooltip: "This weapon deals nonlethal damage. See page 252 for more information on how nonlethal damage works.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Nonlethal"
                },
                'operative': {
                    tooltip: "An operative can use the trick attack class feature (see page 93) with a weapon that has this special property. Any character can add her Dexterity modifier rather than her Strength modifier on melee attack rolls with weapons with this special property.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Operative"
                },
                'penetrating': {
                    tooltip: "A penetrating weapon is designed to punch through large objects’ outer layers, making it easier to damage them. A penetrating weapon ignores an amount of hardness equal to the weapon’s level.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Penetrating"
                },
                'polarize': {
                    tooltip: "A weapon with the polarize special property briefly builds up a polarized charge in a target. When striking a target multiple times with a weapon with the polarize special property in the same round, damage from each such strike after the first is increased by the listed amount. This resets at the beginning of your next turn.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Polarize"
                },
                'polymorphic': {
                    tooltip: "Melee weapons with the polymorphic weapon special property are made of a multitude of linked scales that can be reconfigured with a gesture. The wielder can cause the scales to flatten, form several contiguous sharp edges, or stand upright as a series of points. As a swift action or once as part of a full action, a creature wielding a polymorphic weapon can change its damage type from bludgeoning, slashing, or piercing to another of those types.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Polymorphic"
                },
                'powered': {
                    tooltip: "A melee weapon with an internal battery that must be charged to function has the powered special property, which lists its capacity and usage. Unlike with a ranged weapon, the usage is for 1 minute of operation rather than per attack, though using a powered weapon for less than 1 full minute still expends 1 full usage. The number of charges expended is equal to the usage × the number of minutes the weapon is used, rounded up to the nearest minute. You can activate the power of the weapon as part of the action used to make an attack with it, and it automatically deactivates after 1 minute. As with ranged weapons, you can recharge the battery of a powered melee weapon using a generator or a recharging station, or you can purchase new batteries for it. If you try to attack with a powered weapon that’s out of charges, it functions as an improvised weapon (see page 169).",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Powered"
                },
                'professional': {
                    tooltip: "A professional weapon is a tool used in a specialized trade that nevertheless has tremendous damaging potential. When using a professional weapon, you gain a +2 insight bonus to checks with the listed Profession skill (or to checks with similar skills that could reasonably use that weapon as part of the profession, subject to the GM’s discretion). If you have a number of ranks in the listed Profession skill equal to the item level, you are considered proficient with that weapon, even if you would not normally be. This proficiency never counts toward prerequisites of any kind.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Professional"
                },
                'punch gun': {
                    tooltip: "A punch gun weapon is a small ranged weapon outfitted with a pressure-sensitive firing mechanism that is affixed to a glove or a similar item. Unlike most ranged weapons, which discharge when a trigger is pulled, a punch gun fires when sufficient pressure is placed upon its barrel. All punch gun projectile weapons have a range equal to their wielder’s natural reach. Although these are ranged attacks, they do not provoke attacks of opportunity.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Punch%20Gun"
                },
                'quick reload': {
                    tooltip: "You can reload this weapon as part of the same action as firing it, instead of taking a move action to reload.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Quick%20Reload"
                },
                'radioactive': {
                    tooltip: "A radioactive weapon contains unstable radioactive components. When the wielder rolls a natural 1 on an attack roll, she is exposed to dangerous radiation and must succeed at a Fortitude save or be inflicted with radiation sickness. (For radioactive blast weapons, the user must attempt a Fortitude save if any of the attacks are a natural 1). This is considered a low level of radiation. The DCs for this save and the disease are each equal to the weapon’s critical hit DC.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Radioactive"
                },
                'reach': {
                    tooltip: "Only melee weapons can have the reach special property. Wielding a weapon with reach gives you 10 feet of reach for attacks with that weapon. See Reach and Threatened Squares on page 255 for more information.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Reach"
                },
                'recall': {
                    tooltip: "A recall weapon is keyed to a wristband or another small device worn by the wearer (which does not count against the maximum of two worn magic or hybrid items). If you throw a recall weapon and your attack misses, the weapon returns to you at the end of your turn.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Recall"
                },
                'regrowth': {
                    tooltip: "This weapon regrows its own ammunition, usually with the help of sunlight and nutrients drawn from the air or soil. It takes the weapon 8 hours to replenish its full capacity of ammunition; this ammunition is always standard ammunition unique to the weapon and cannot be sold.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Regrowth"
                },
                'relic': {
                    tooltip: "These rare items are bits of lost technology or unique items less powerful than artifacts. A relic has an item level but can be sold for 100% of the item’s price (like trade goods). A relic cannot be crafted without the means of a specific formula, which is almost always long lost, and often requires specific materials. A relic that became understood well enough to be reproduced, standardized, and mass-marketed might lose its relic status. Unlike normal weapons, relic weapons do not come fully loaded with ammunition unless they say so.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Relic"
                },
                'reposition': {
                    tooltip: "When you attempt a reposition combat maneuver with this weapon, you gain a +2 bonus to your attack roll.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Reposition"
                },
                'shape': {
                    tooltip: "A weapon with the shape special property has a complex targeting array that allows it to target specified areas. If you make a single attack as a full action with such a weapon, you can exclude the listed number of squares from within this weapon’s area of effect. This means you can avoid shooting an ally in the area of a blast weapon’s effect, for example.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Shape"
                },
                'shells': {
                    tooltip: "A few melee weapons can be loaded with scattergun shells to create a powerful close-range, one-shot attack. A weapon with the shell special property lists its capacity and usage value. Unlike charges for powered melee weapons, this usage is per attack.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Shells"
                },
                'shield': {
                    tooltip: "A shield weapon encapsulates the target in a short-term force field. This force field lasts until the start of your next turn or until it has absorbed the listed amount of damage, whichever occurs first. A force field originating from a shield weapon blocks only incoming damage; it does not interfere in any way with the target’s weapons or attacks. You can’t use a shield projector to target yourself.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Shield"
                },
                'sniper': {
                    tooltip: "Weapons with the sniper special property can be fired accurately at very long ranges if aimed properly. If you aim the weapon as a move action and then fire it on the same turn, use the value listed with the sniper special property as the weapon’s range increment. You can still fire a sniper weapon as normal, but it has only the range listed under its normal range entry when you do.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Sniper"
                },
                'stun': {
                    tooltip: "You can set a weapon with the stun special property to stun mode (or reset it to normal mode) as a move action. While in stun mode, all the weapon’s attacks are nonlethal. See page 252 for more about how nonlethal damage works.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Stun"
                },
                'subtle': {
                    tooltip: "A subtle weapon fires either very small ordnance or otherwise generates a nearly imperceptible discharge that even the target may not be aware of. A target hit by a subtle weapon must succeed at a Perception check with a DC equal to 15 + 1-1/2 the weapon’s item level or it doesn’t realize it has been struck. The target notices other effects conveyed by a subtle weapon, such as an injected substance, as normal. For example, you might use a subtle weapon to inject a target with a poison with an onset delay; the target may not realize it has been hit by the dart, but it would notice the effects of the poison once it took effect.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Subtle"
                },
                'sunder': {
                    tooltip: "When you attempt a sunder combat maneuver while wielding a weapon with the sunder weapon special property, you gain a +2 bonus to your attack roll.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Sunder"
                },
                'swarm': {
                    tooltip: "A weapon with this special property is virtually indistinguishable from Swarm technology and requires a special Swarm battery to use efficiently. The weapon can use other batteries, but usage doubles when doing so. In addition to the energy drawback, a Swarm weapon attracts the attention of nearby Swarm creatures. They can sense such a weapon as if using blindsense with a range of 30 feet. Swarm components have been observed fixating on wielders of this technology during battle, with little else to explain such a violent focus. If the Swarm wins the conflict, the surviving components destroy these weapons.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Swarm"
                },
                'tail': {
                    tooltip: "If you have a tail (or similar taillike appendage), you can wear a weapon with the tail weapon special property on your tail, rather than wield it in your hand. Attaching or removing a tail weapon is a full action, and once it’s installed, you wield the weapon without using your hands.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Tail"
                },
                'teleportive': {
                    tooltip: "This weapon’s fired ammunition teleports a short distance after being fired. You take only a –1 cumulative penalty when attacking outside the range of this weapon.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Teleportive"
                },
                'thought': {
                    tooltip: "A thought weapon can be fully or partially controlled via telepathy. If you have the telepathy or limited telepathy racial trait, are benefiting from a telepathy spell, are wearing a mindlink circlet, or have a similar ability, you ignore the weapon’s unwieldy weapon special property.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Thought"
                },
                'throttle': {
                    tooltip: "A throttle weapon deals damage only when it is used to grapple a foe, automatically dealing damage with every successful grapple combat maneuver. These are considered attacks for abilities that can increase a weapon’s damage (such as trick attack). All throttle weapons are also grapple weapons. While a target is successfully being grappled with a throttle weapon, it cannot use its airways to speak or make vocalizations of any kind (though other forms of making noise work normally).",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Throttle"
                },
                'thrown': {
                    tooltip: "Ranged weapons that must be thrown and melee weapons that can be thrown as a ranged attack have the thrown special property. You apply your Strength modifier to damage rolls for thrown attacks. After you throw a weapon, it lands near your target and you must recover it if you want to attack with it again.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Thrown"
                },
                'trip': {
                    tooltip: "When you attempt a trip combat maneuver while wielding a weapon with this property, you gain a +2 bonus to your attack roll.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Trip"
                },
                'unbalancing': {
                    tooltip: "This weapon pushes foes off-balance. When you deal damage with this weapon, the target is flat-footed against the next attack that targets it before the start of your next turn. Anything that causes a critical hit to be treated as a normal hit, such as fortification, grants immunity to this special property.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Unbalancing"
                },
                'underwater': {
                    tooltip: "A weapon with this special property that is used underwater ignores the –2 penalty to attack rolls and deals full damage.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Underwater"
                },
                'unwieldy': {
                    tooltip: "Weapons with the unwieldy special property are large and awkward, can’t be fired without cooling down first, or are otherwise difficult to use with repeated attacks. You can’t use an unwieldy weapon as part of a full attack (or any other action in which you could make multiple attacks), you can’t attack with it more than once per round, and you can’t use it to make an attack of opportunity.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Unwieldy"
                },
                'variant boost': {
                    tooltip: "A weapon with the variant boost special property acts as a weapon with the boost special property, except boosting the weapon does not expend additional charges and the weapon can be boosted only the listed number of times per day.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Variant%20Boost"
                },
                'wide line': {
                    tooltip: "A wide line weapon functions as a weapon with the line weapon special property, except the line is 10 feet wide. When determining the squares that are in the path of a line, note which squares that line would normally pass through, and extend the area to one side of the line (your choice) so that the line is 2 squares wide. For an obstacle to block the path of a line, it must block the line’s full width; otherwise, the line continues (at full width) beyond the obstacle.",
                    link: "https://www.aonsrd.com/WeaponProperties.aspx?ItemName=Wide%20Line"
                }
            };

            var found_traits = {};
            var traits_by_index = {};
            var last_index = 0;
            var new_special_traits_string = '';
            var sorted_indices;

            // Spin through the special traits of the weapon to find any
            // matching traits and their starting indices within the special
            // traits string
            if (special_traits_string !== undefined && special_traits_string.length > 0) {
                _.each(special_trait_info, function (info_def, trait_name) {
                    if (!_.has(found_traits, trait_name)) {
                        var search_results = self._searchStringForTrait(trait_name, special_traits_string, 0, info_def['conflicts']);

                        if (!_.isEmpty(search_results)) {
                            found_traits = {
                                ...found_traits,
                                ...search_results
                            };
                        }
                    }
                });
            }

            // Now that we have an object containing all the matching traits and
            // where they were found, build another object with the indices as
            // the keys so that we can move through the special traits string
            // programmatically and do replacements at the proper locations
            _.each(found_traits, function (trait_def, trait_name) {
                var start_indices = trait_def['start_indices'];

                _.each(start_indices, function (index) {
                    traits_by_index[index] = trait_name;
                });
            });

            sorted_indices = _.keys(traits_by_index);
            sorted_indices.sort((a, b) => a - b);

            // Now go through the indices, in order, and start doing our
            // substitutions
            _.each(sorted_indices, function (index) {
                var trait_name = traits_by_index[index];
                var tooltip = special_trait_info[trait_name]['tooltip'];
                var link = special_trait_info[trait_name]['link'];
                var trait_sub = `<span class="showtip tipsy" title="${tooltip}"><a href="${link}">${trait_name}</a></span>`;

                if (special_traits_string !== undefined) {
                    new_special_traits_string += special_traits_string.substring(last_index, index);
                    new_special_traits_string += trait_sub;
                    last_index = Number(index) + Number(trait_name.length);
                }

            });

            if (special_traits_string !== undefined)
            {
                new_special_traits_string += special_traits_string.substring(last_index);
            }
            
            return new_special_traits_string;
        } // end _generateWeaponSpecialTraitsLinks

        _generateWeaponCritEffectLinks (crit_effects_string) {
            var self = this;
            var crit_effect_info = {
                'arc': {
                    tooltip: "The attack’s energy leaps to a second creature. This secondary target must be within 10 feet of your original target and must be the creature closest to the original target (you choose if multiple creatures are equidistant). Roll the amount of damage listed in the weapon’s arc—the secondary target takes this damage (not multiplied by the critical hit), of whatever type the weapon deals.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Arc",
                    conflicts: ['second arc']
                },
                'bind': {
                    tooltip: "The target is entangled, as if the weapon had the entangle weapon special property.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Bind"
                },
                'bleed': {
                    tooltip: "The target gains the bleeding condition (see page 273).",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Bleed"
                },
                'blind': {
                    tooltip: "The target must succeed at a Reflex saving throw or gain the blinded condition for 1d3 rounds.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Blind"
                },
                'burn': {
                    tooltip: "The target gains the burning condition (see page 273).",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Burn"
                },
                'confuse': {
                    tooltip: "The target must succeed at a Will saving throw or gain the confused condition for 1 round.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Confuse"
                },
                'corrode': {
                    tooltip: "The target takes corrode damage equal to the amount listed. This functions as the burning condition but deals acid damage rather than fire damage.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Corrode"
                },
                'deafen': {
                    tooltip: "The target must succeed at a Fortitude saving throw or be deafened (see page 275) for 1d4 minutes.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Deafen"
                },
                'demoralize': {
                    tooltip: "You can attempt an Intimidate check with a –5 penalty to demoralize your foes as a reaction. Compare the result of this check to the DC of each creature that took damage from this attack using the guidelines from the demoralize task of the Intimidate skill.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Demoralize"
                },
                'electrocute': {
                    tooltip: "The target must succeed at a Fortitude saving throw or take 1d4 Dexterity damage.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Electrocute"
                },
                'embed': {
                    tooltip: "The attack embeds a barbed needle or another lingering effect in the target. The first time each round the target moves 5 feet or more in a single action (voluntarily or not), it takes the listed damage. The target can remove the embedded object with a standard action, dealing the listed damage in the process. Alternatively, with a successful Medicine check (DC = 15 + 1-1/2 the weapon’s item level), another creature can remove the object from the target and deal no damage. Multiple embedded objects each deal their listed damage and must be removed one at a time.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Embed"
                },
                'enfeeble': {
                    tooltip: "The target must succeed at a Fortitude saving throw or take 1d4 Strength damage.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Enfeeble"
                },
                'fatigue': {
                    tooltip: "The target must succeed at a Fortitude saving throw or gain the fatigued condition for 1 round per item level of the weapon. This condition can be removed as normal.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Fatigue"
                },
                'immobilize': {
                    tooltip: "The target must succeed at a Fortitude saving throw or be knocked prone and gain the pinned condition. The target can escape the pinned condition by succeeding at an Acrobatics check (DC = 20 + 1-1/2 × the weapon’s item level). The pinned condition ends automatically if the weapon’s wielder either moves or attacks with the weapon again; the penalties from the pinned condition still apply to the target if the wielder uses the weapon to attack the pinned target.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Immobilize"
                },
                'injection dc +2': {
                    tooltip: "If the weapon is used to deliver a poison or drug of some kind, the save DC of that poison is increased by 2 when delivered on a critical hit.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Injection%20DC%20+2"
                },
                'irradiate': {
                    tooltip: "The target must succeed at a Fortitude save or contract radiation sickness. The DC for this disease is equal to the weapon’s critical hit DC. This is considered low-level radiation, regardless of the save DC.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Irradiate"
                },
                'jet': {
                    tooltip: "The attack emits a jet of energy that suffuses the target and extends to strike a second creature. This secondary target must be adjacent to the original target and on the opposite border or opposite corner of the target’s space from you. When in doubt about whether a second creature’s position compared to a target makes it subject to a jet attack, trace a line from the center of your space to the center of the second creature’s space. If the line passes through opposite borders or corners of the primary target’s space, then the second creature is a valid target for the jet attack. If multiple valid targets of the jet damage are present, you choose which is the secondary target. Roll the amount of damage listed in the weapon’s jet: the secondary target takes this damage (not multiplied by the critical hit) of whatever energy damage type the weapon deals.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Jet"
                },
                'knockdown': {
                    tooltip: "The target is knocked prone (see page 277).",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Knockdown"
                },
                'leech': {
                    tooltip: "This weapon can leach life force from a target, draining its vitality and leaving it feeling unsteady. The target must succeed at a Fortitude save or gain the off-target condition for 1 round per item level of the weapon. This has no effect if the target is immune to disease.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Leech"
                },
                'nauseate': {
                    tooltip: "The target must succeed at a Fortitude saving throw or gain the nauseated condition for 1 round.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Nauseate"
                },
                'nuisance': {
                    tooltip: "This weapon delivers targeted pops of sound and strobes of light. If you score a critical hit against a target with this weapon, the target is affected as though hit with harrying fire.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Nuisance"
                },
                'pulse': {
                    tooltip: "The weapon’s output explodes in a pulse of energy. All creatures adjacent to the original target take the amount of damage listed in the pulse entry, of the same type dealt by the weapon’s initial attack.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Pulse"
                },
                'push': {
                    tooltip: "The target is pushed the listed distance away from you. If the target runs into an obstacle, it stops moving and falls prone.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Push"
                },
                'recharge': {
                    tooltip: "When the wielder scores a critical hit against a living creature or a construct with the technological subtype, the weapon regains the listed number of charges (up to the weapon’s maximum capacity).",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Recharge"
                },
                'second arc': {
                    tooltip: "The attack’s energy continues leaping from a secondary target to a tertiary target. This functions identically to the arc critical hit effect, except the second arc can’t target either the original target of the attack or the creature struck by the first arc special property.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Second%20Arc"
                },
                'severe wound': {
                    tooltip: "Roll twice on Table 7–11: Wounding Weapons and choose your desired result. The target can still attempt any associated save.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Severe%20Wound"
                },
                'sicken': {
                    tooltip: "The target must succeed at a Fortitude saving throw or become sickened for 1d4 minutes. This has no effect if the target is immune to disease.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Sicken"
                },
                'staggered': {
                    tooltip: "The target must succeed at a Fortitude save or be staggered (see page 277) for 1 round.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Staggered"
                },
                'stifle': {
                    tooltip: "The target can’t speak or make vocalizations of any kind for 1 round.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Stifle"
                },
                'stunned': {
                    tooltip: "The target is stunned (see page 277) for 1 round.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Stunned"
                },
                'suffocate': {
                    tooltip: "The weapon sucks the atmosphere away from the target. If the target is wearing armor or a space suit that has activated environmental protections, the weapon depletes a number of days of that protection equal to half the weapon’s item level. If this depletes the environmental protections entirely, or if the target was not wearing any such protections, the target must succeed at a Fortitude save or gain the exhausted condition.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Suffocate"
                },
                'wound': {
                    tooltip: "Roll on Table 7-11: Wounding Weapons. The target must succeed at a saving throw of the listed type (if any) or suffer the listed effect. If the creature lacks a specified location, use the general location.",
                    link: "https://www.aonsrd.com/WeaponCriticals.aspx?ItemName=Wound",
                    conflicts: ['severe wound']
                }
            };

            var found_effects = {};
            var effects_by_index = {};
            var last_index = 0;
            var new_crit_effects_string = '';
            var sorted_indices;

            // Spin through the special traits of the weapon to find any
            // matching traits and their starting indices within the special
            // traits string
            if (crit_effects_string !== undefined && crit_effects_string.length > 0) {
                _.each(crit_effect_info, function (info_def, effect_name) {
                    if (!_.has(found_effects, effect_name)) {
                        var search_results = self._searchStringForTrait(effect_name, crit_effects_string, 0, info_def['conflicts']);

                        if (!_.isEmpty(search_results)) {
                            found_effects = {
                                ...found_effects,
                                ...search_results
                            };
                        }
                    }
                });
            }

            // Now that we have an object containing all the matching traits and
            // where they were found, build another object with the indices as
            // the keys so that we can move through the special traits string
            // programmatically and do replacements at the proper locations
            _.each(found_effects, function (effect_def, effect_name) {
                var start_indices = effect_def['start_indices'];

                _.each(start_indices, function (index) {
                    effects_by_index[index] = effect_name;
                });
            });

            sorted_indices = _.keys(effects_by_index);
            sorted_indices.sort((a, b) => a - b);

            // Now go through the indices, in order, and start doing our
            // substitutions
            _.each(sorted_indices, function (index) {
                var effect_name = effects_by_index[index];
                var tooltip = crit_effect_info[effect_name]['tooltip'];
                var link = crit_effect_info[effect_name]['link'];
                var effect_sub = `<span class="showtip tipsy" title="${tooltip}"><a href="${link}">${effect_name}</a></span>`;
                
                if (crit_effects_string !== undefined)
                {
                    new_crit_effects_string += crit_effects_string.substring(last_index, index);
                    new_crit_effects_string += effect_sub;
                    last_index = Number(index) + Number(effect_name.length);
                }
            });

            if (crit_effects_string !== undefined) {
                new_crit_effects_string += crit_effects_string.substring(last_index);
            }

            return new_crit_effects_string;
        } // end _generateWeaponCritEffectLinks

        _searchStringForTrait(trait_name, trait_string, from_index, conflicts) {
            var self = this;
            var finished = false;
            var matches = {};

            while (!finished) {
                if (trait_string.toLowerCase().indexOf(trait_name, from_index) > -1) {
                    var found_index = trait_string.toLowerCase().indexOf(trait_name, from_index);
                    var conflict_is_match = false;
                    // Check to see if this trait has any potential
                    // conflicts (those being where a trait name is also a
                    // partial match for another trait, like 'line' being
                    // a partial match for 'wide line')
                    if (conflicts !== undefined && Array.isArray(conflicts)) {
                        _.each(conflicts, function (conflict_name) {
                            var conflict_match = self._searchStringForTrait(conflict_name, trait_string, from_index);

                            // Check to see if we got a match out of that
                            if (!_.isEmpty(conflict_match)) {
                                // If we did, let's pull in all the start
                                // indices that were found for the conflict.
                                var start_indices = conflict_match[_.keys(conflict_match)[0]]['start_indices'];
                                _.each(start_indices, function (start_index) {
                                    // What we're looking for here is to see if
                                    // the start index is less than the found
                                    // index, because this would indicate that
                                    // conflict is the match we came across
                                    // initially was actually a conflict, and
                                    // not the trait we were initially searching
                                    // for.
                                    if (start_index < found_index) {
                                        conflict_is_match = true;
                                        from_index = start_index + conflict_name.length;
                                    }
                                });

                                matches = {
                                    ...matches,
                                    ...conflict_match
                                }
                            }
                        });
                    }

                    if (!conflict_is_match) {
                        if (!_.has(matches, trait_name)) {
                            matches[trait_name] = {
                                start_indices: [found_index]
                            };
                        }
                        else {
                            matches[trait_name]['start_indices'].push(found_index);
                        }

                        from_index = found_index + trait_name.length;
                    }
                }
                else {
                    finished = true;
                }
            }

            return matches;
        } // end _searchStringForTrait

        _makeWeaponOfferDisplay(item) {
            var weapon_category_string_map = {
                basic_melee:    'Basic Melee',
                advanced_melee: 'Advanced Melee',
                small_arm:      'Small Arm',
                longarm:        'Longarm',
                heavy:          'Heavy Weapon',
                grenade:        'Grenade',
                sniper:         'Sniper',
                special:        'Special'
            };

            var name = item.getName();
            var bulk = item.getDefinition('bulk');
            var category = weapon_category_string_map[item.getDefinition('attack_category')];
            var damage_roll = item.getDefinition('attack_damage_dice');
            var damage_type = item.getDefinition('attack_damage_type');
            var crit_effect = this._generateWeaponCritEffectLinks(item.getDefinition('attack_crit_effect'));
            var special_traits = this._generateWeaponSpecialTraitsLinks(item.getDefinition('attack_special_traits'));
            var range = item.getDefinition('attack_range');
            var ammo_type = item.getDefinition('attack_ammo_type');
            var ammo_max = item.getDefinition('attack_ammo_max');
            var ammo_usage = item.getDefinition('attack_ammo_usage');
            var item_description = item.getDefinition('item_description');
            var attack_description = item.getDefinition('attack_description');
            var description = _.filter([item_description, attack_description], function (notes) {
                if (notes !== undefined && notes.length > 0) {
                    return true;
                }
                return false;
            });
            var content = [];

            var content_fields = [
                {
                    name: 'Bulk',
                    value: bulk,
                    default: '-'
                },
                {
                    name: 'Category',
                    value: category
                },
                {
                    name: 'Damage Roll',
                    value: damage_roll
                },
                {
                    name: 'Damage Type',
                    value: damage_type
                },
                {
                    name: 'Crit Effect',
                    value: crit_effect
                },
                {
                    name: 'Special Traits',
                    value: special_traits
                },
                {
                    name: 'Range',
                    value: range
                },
                {
                    name: 'Ammo Type',
                    value: ammo_type
                },
                {
                    name: 'Ammo Capacity',
                    value: ammo_max
                },
                {
                    name: 'Ammo Usage',
                    value: ammo_usage
                }
            ];

            _.each(content_fields, function (field_def) {
                var field_name = field_def['name'];
                var field_value = field_def['value'];
                var field_default = field_def['default'];

                if ((field_value === undefined || field_value.length === 0) && field_default !== undefined) {
                    field_value = field_default;
                }

                if (field_value !== undefined && field_value.length !== 0) {
                    field_value = `${field_value}`;
                    field_value = field_value.replace(/\[/g, '');
                    field_value = field_value.replace(/\]/g, '');
                    content.push([field_name, field_value]);
                }
            });

            return this._generateTemplate(
                {
                    name: 'Weapon',
                    title: name,
                    content: content,
                    notes: description.join('\n')
                }
            );
        } // end _makeWeaponOfferDisplay

        _makeArmorOfferDisplay(item) {
            var armor_stats = {};
            var armor_type_string_map = {
                light_armor: 'Light Armor',
                heavy_armor: 'Heavy Armor',
                power_armor: 'Powered Armor'
            };

            var name = item.getName();
            var bulk = item.getDefinition('bulk');
            var armor_type = armor_type_string_map[item.getDefinition('armor_type')];
            var mods = item.getDefinition('item_mods');
            var description = item.getDefinition('item_description');
            var eac;
            var kac;
            var max_dex;
            var acp;

            var content = [];
            var content_fields;

            armor_stats['eac']     = mods.match(/([-|+]\d+) armor to eac/i);
            armor_stats['kac']     = mods.match(/([-|+]\d+) armor to kac/i);
            armor_stats['max_dex'] = mods.match(/(\d+) max dex to armor/i);
            armor_stats['acp']     = mods.match(/(-?\d+) to acp/i);

            // There will be instances where a piece of armor doesn't have some
            // or any of these mods defined, so if that's the case we want to
            // make sure to keep the field as an empty string so the offer
            // display isn't screwed up
            for (var key of ['eac', 'kac', 'max_dex', 'acp']) {
                if (armor_stats[key] == null || armor_stats[key].length < 2) {
                    armor_stats[key] = '';
                }
                else{
                    armor_stats[key] = armor_stats[key][1];
                }
            }
            eac = armor_stats['eac'];
            kac = armor_stats['kac'];
            max_dex = armor_stats['max_dex'];
            acp = armor_stats['acp'];

            content_fields = [
                {
                    name: 'Bulk',
                    value: bulk,
                    default: '-'
                },
                {
                    name: 'Type',
                    value: armor_type
                },
                {
                    name: 'EAC',
                    value: eac
                },
                {
                    name: 'KAC',
                    value: kac
                },
                {
                    name: 'Max Dex Bonus',
                    value: max_dex
                },
                {
                    name: 'Armor Check Penalty',
                    value: acp
                }
            ];

            _.each(content_fields, function (field_def) {
                var field_name = field_def['name'];
                var field_value = field_def['value'];
                var field_default = field_def['default'];

                if ((field_value === undefined || field_value.length === 0) && field_default !== undefined) {
                    field_value = field_default;
                }

                if (field_value !== undefined && field_value.length !== 0) {
                    field_value = `${field_value}`;
                    field_value = field_value.replace(/\[/g, '');
                    field_value = field_value.replace(/\]/g, '');
                    content.push([field_name, field_value]);
                }
            });

            return this._generateTemplate(
                {
                    name: 'Armor',
                    title: name,
                    content: content,
                    notes: description
                }
            );
        } // end _makeArmorOfferDisplay

        _makeItemOfferDisplay(item) {
            var name = item.getName();
            var bulk = item.getDefinition('bulk');
            var item_uses = item.getDefinition('item_uses');
            var description = item.getDefinition('item_description');
            var content = [];

            var content_fields = [
                {
                    name: 'Bulk',
                    value: bulk,
                    default: '-'
                },
                {
                    name: 'Uses',
                    value: item_uses
                }
            ];

            _.each(content_fields, function (field_def) {
                var field_name = field_def['name'];
                var field_value = field_def['value'];
                var field_default = field_def['default'];

                if ((field_value === undefined || field_value.length === 0) && field_default !== undefined) {
                    field_value = field_default;
                }

                if (field_value !== undefined && field_value.length !== 0) {
                    field_value = `${field_value}`;
                    field_value = field_value.replace(/\[/g, '');
                    field_value = field_value.replace(/\]/g, '');
                    content.push([field_name, field_value]);
                }
            });

            return this._generateTemplate(
                {
                    name: 'Item',
                    title: name,
                    content: content,
                    notes: description
                }
            );
        } // end _makeItemOfferDisplay

        _makeCurrencyOfferDisplay(currency) {
            var unit = currency.getUnit(true);

            var standard_description = {
                'credits': 'All interplanetary business is conducted in standardized credits, thanks to their backing and regulation through the Pact Worlds government and the church of Abadar. Converting a world’s economy to the credit standard is a requirement of joining the Pact Worlds, and even worlds far outside the Pact’s official jurisdiction often prefer to use them, since they are so universally carried and understood.\nCredits are a combination of digital and physical currency. Most individuals and corporations in Starfinder store their funds digitally in accounts with major banking houses, protected by the strongest spells and encryption money can buy. Yet the price of such security is high: accessing these funds requires jumping through significant hoops, and official transactions between accounts must be transparent to government and banking officials, making true privacy impossible.',
                'UPBs': 'A universal polymer base, or UPB, is the basis for most technology in the Pact Worlds, the Veskarium, and many other systems. Each UPB is a tiny multifunction component, not much larger than a grain of rice, capable of being configured to act as a brace, capacitor, circuit, diode, fastener, insulator, lens, modulator, pipe, resistor, and dozens of other constituent parts. UPBs can even be spun out into fabric, broken down into component chemicals, reconstituted into new chemicals, or supplemented with base materials (such as dirt or sand) to form massive braces or walls. The right combination of hundreds or even thousands of UPBs can create everything from a comm unit to a laser weapon to powered armor. In their raw form, UPBs have a bulk of 1 per 1,000 UPBs, though when aligned and configured they can easily take up less bulk, and when configured for a specific purpose that calls for a minimum size and bracing (possibly combining them with inert materials), they can have a higher bulk.\nUPBs are so ubiquitous that they are usable as currency in many major settlements and trade hubs. While credsticks are a more convenient and secure way to carry value, UPBs have the advantage of direct utility and untraceability. They are a popular way to pay smugglers and criminals, but they are also useful for trade missions to systems with UPB technology that don’t use credits as currency. The value of the Pact Worlds’ credit is based on the economic utility of a single UPB.'
            };

            var description = standard_description[unit];

            return this._generateTemplate(
                {
                    name: 'Currency',
                    title: unit,
                    notes: description
                }
            );
        } // end _makeItemOfferDisplay

        read(character_id) {
            var self = this;
            var structured_inventory_objects = [];
            var item_attribute_fields;
            var item_parsed_values;
            var attack_attribute_fields;
            var attack_parsed_values;

            // Get all the item attribute fields for this specific character
            item_attribute_fields = filterObjs(function (obj) {
                var prefix_regex = new RegExp("^" + self._item_field_mapper['prefix']);
                if (obj.get('type') === 'attribute' && obj.get('characterid') === character_id && prefix_regex.test(obj.get('name'))) {
                    return true;
                }
                return false;
            });

            // To make an item easier to parse from an object perspective, we
            // want to group item fields together that all have the same row ID
            // since all of those make up a singular item in the character
            // inventory.
            item_parsed_values = _.groupBy(item_attribute_fields, function(field) {
                var row_id_grab_regex = new RegExp("^" + self._item_field_mapper['prefix'] + "([^_]+)" + "_\\S+$");
                var row_id = field.get('name').match(row_id_grab_regex)[1];
                return row_id;
            });

            // Get all the attack attribute fields for this specific character.
            // We want to gather attack details because while a weapon has an
            // inventory presense in the character sheet, it doesn't actually
            // carry any of the attack values so it's rather useless from a
            // character sheet perspective. If we grab the attack details then
            // it gives the item more information to present in an offer as well
            // as making it more complete when that item is populated in a
            // character sheet by having the attack entry prepopulated.
            attack_attribute_fields = filterObjs(function (obj) {
                var prefix_regex = new RegExp("^" + self._attack_field_mapper['prefix']);
                if (obj.get('type') === 'attribute' && obj.get('characterid') === character_id && prefix_regex.test(obj.get('name'))) {
                    return true;
                }
                return false;
            });

            // To make an attack easier to parse from an object perspective, we
            // want to group item fields together that all have the same row ID
            // since all of those make up a singular attack in the character
            // inventory.
            attack_parsed_values = _.groupBy(attack_attribute_fields, function(field) {
                var row_id_grab_regex = new RegExp("^" + self._attack_field_mapper['prefix'] + "([^_]+)" + "_\\S+$");
                var row_id = field.get('name').match(row_id_grab_regex)[1];
                return row_id;
            });

            // Generate currency objects for this character.
            _.each(self._currency_definitions, function(definition, key) {
                var field_name = definition['field'];
                var field_value = definition['default'];
                var type = definition['type'];
                var currency_attribute_objects = findObjs({
                    type: 'attribute',
                    characterid: character_id,
                    name: field_name
                });

                if (currency_attribute_objects.length > 0) {
                    if (_.has(definition, 'max') && definition['max']) {
                        field_value = currency_attribute_objects[0].get('max');
                    }
                    else {
                        field_value = currency_attribute_objects[0].get('current');
                    }
                }

                // If we have a type defined, then see what type we expect and
                // make the field conform to that
                if (type !== undefined) {
                    if (type === 'int') {
                        if (isNaN(field_value) || field_value.length < 1) {
                            field_value = definition['default'];
                        }
                        field_value = parseInt(field_value);
                    }
                }

                // Probably not worth creating currency objects if the value is
                // 0 or less.
                if (Number(field_value) > 0) {
                    var whole_numbers_only = true;
                    var currency_object = new LootManager.class.CurrencyClass(whole_numbers_only);
                    currency_object.setDefinition('quantity', field_value, 'quantity');
                    currency_object.setDefinition('singular', definition['singular'], 'singular');
                    currency_object.setDefinition('plural', definition['plural'], 'plural');
                    currency_object.setDefinition('name', key);
                    currency_object.setDefinition('character_id', character_id, 'character_id');
                    currency_object.setOfferDisplay(self._makeCurrencyOfferDisplay(currency_object));
                    structured_inventory_objects.push(currency_object);
                }
            });

            // Build out item definitions for each item in the inventory.
            // We specifically want to standardize all of the field names so
            // it's easily translatable when writing out the item to a
            // character sheet.
            _.each(item_parsed_values, function(item_row_attributes, item_row_id) {
                var item = new LootManager.class.InventoryItemClass();
                item.setDefinition('item_row_id', item_row_id);
                item.setDefinition('character_id', character_id, 'character_id');

                // Set the defaults to start with
                _.each(self._item_field_mapper['suffix'], function(suffix, key) {
                    if (_.has(suffix['field'], 'default')) {
                        var tag = '';
                        switch (key) {
                            case 'item_name':
                                tag = 'name';
                                break;
                            case 'quantity':
                                tag = 'quantity';
                                break;
                        }
                        item.setDefinition(key, suffix['field']['default'], tag);
                    }
                });

                // Now we need to go through and get the actual values
                _.each(item_row_attributes, function(attribute) {
                    _.each(self._item_field_mapper['suffix'], function(suffix, key) {
                        var attribute_name = self._item_field_mapper['prefix'] + item_row_id + suffix['field']['name'];
                        var type = suffix['field']['type'];
                        var default_value = suffix['field']['default'];
                        if (attribute.get('name') === attribute_name) {
                            var value;
                            if (_.has(suffix['field'], 'max') && suffix['field']['max']) {
                                value = attribute.get('max');
                            }
                            else {
                                value = attribute.get('current');
                            }

                            // If we have a type defined, then see what type we
                            // expect and make the field conform to that
                            if (type !== undefined) {
                                if (type === 'int') {
                                    if (isNaN(value) || value.length < 1) {
                                        value = default_value;
                                    }
                                    value = parseInt(value);
                                }
                            }

                            item.setDefinition(key, value);
                        }
                    });
                });

                if (item.getDefinition('purpose') === 'weapon') {
                    _.each(attack_parsed_values, function(attack_row_attributes, attack_row_id) {
                        // We only want to associate an attack with an item
                        // if the name on the attack matches the name on the
                        // item, so spin through, find the attribute field that
                        // corresponds to the name, and check that they match
                        _.each(attack_row_attributes, function(attribute) {
                            var attack_name_field = self._attack_field_mapper['prefix'] + attack_row_id + self._attack_field_mapper['suffix']['attack_name']['field']['name'];
                            if (attribute.get('name') === attack_name_field) {
                                if (attribute.get('current') === item.getName()) {
                                    item.setDefinition('attack_row_id', attack_row_id);

                                    // Set the defaults to start with
                                    _.each(self._attack_field_mapper['suffix'], function(suffix, key) {
                                        if (_.has(suffix['field'], 'default')) {
                                            item.setDefinition(key, suffix['field']['default']);
                                        }
                                    });

                                    _.each(attack_row_attributes, function(attribute) {
                                        _.each(self._attack_field_mapper['suffix'], function(suffix, key) {
                                            var attribute_name = self._attack_field_mapper['prefix'] + attack_row_id + suffix['field']['name'];
                                            var type = suffix['field']['type'];
                                            var default_value = suffix['field']['default'];
                                            if (attribute.get('name') === attribute_name) {
                                                var value;
                                                if (_.has(suffix['field'], 'max') && suffix['field']['max']) {
                                                    value = attribute.get('max');
                                                }
                                                else {
                                                    value = attribute.get('current');
                                                }

                                                // If we have a type defined,
                                                // then see what type we expect
                                                // and make the field conform to
                                                // that
                                                if (type !== undefined) {
                                                    if (type === 'int') {
                                                        if (isNaN(value) || value.length < 1) {
                                                            value = default_value;
                                                        }
                                                        value = parseInt(value);
                                                    }
                                                }

                                                item.setDefinition(key, value);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    });
                }

                structured_inventory_objects.push(item);
            });

            _.each(structured_inventory_objects, function (item) {
                var offer_display_string = '';
                if (item instanceof LootManager.class.InventoryItemClass) {
                    if (item.getDefinition('purpose') === 'armor') {
                        offer_display_string = self._makeArmorOfferDisplay(item);
                    }
                    else if (item.getDefinition('purpose') === 'weapon') {
                        offer_display_string = self._makeWeaponOfferDisplay(item);
                    }
                    else {
                        offer_display_string = self._makeItemOfferDisplay(item);
                    }
                    item.setOfferDisplay(offer_display_string);
                }
            });

            return structured_inventory_objects;
        } // end read

        write(character_id, items) {
            var self = this;

            // If items isn't already an array, make it into one just for ease
            if (!Array.isArray(items)) {
                items = [items];
            }

            // Iterate through the items and write them out to the character
            // supplied
            _.each(items, function (item) {
                if (item instanceof LootManager.class.CurrencyClass) {
                    _.each(self._currency_definitions, function (definition, key) {
                        // Skip past anything that shouldn't be copied
                        if (!_.has(definition, 'copy') || definition['copy']) {
                            if (key === item.getDefinition('name')) {
                                var field_value = item.getQuantity();
                                var attribute_objects = findObjs({
                                    type: 'attribute',
                                    characterid: character_id,
                                    name: definition['field']
                                });

                                if (attribute_objects.length > 0) {
                                    var field;
                                    if (_.has(definition, 'max') && definition['max']) {
                                        field = 'max';
                                    }
                                    else {
                                        field = 'current';
                                    }

                                    attribute_objects[0].set(field, field_value);
                                }
                                else {
                                    var field;
                                    var attribute_def = {
                                        name: definition['field'],
                                        characterid: character_id
                                    };

                                    if (_.has(definition, 'max') && definition['max']) {
                                        field = 'max';
                                    }
                                    else {
                                        field = 'current';
                                    }
                                    attribute_def[field] = field_value;

                                    createObj('attribute', attribute_def);
                                }
                            }
                        }
                    });
                }
                else {
                    var item_row_id = LootManager.generateRowID();
                    var item_id_attribute_name = self._item_field_mapper['prefix'] + item_row_id + '_id';

                    _.each(self._item_field_mapper['suffix'], function(suffix, key) {
                        var attribute_name = self._item_field_mapper['prefix'] + item_row_id + suffix['field']['name'];
                        var field_value = item.getDefinition(key);

                        // Skip past anything that shouldn't be copied
                        if (!_.has(suffix['field'], 'copy') || suffix['field']['copy']) {
                            // Roll20 really doesn't like you trying to set attributes
                            // with undefined values, and honestly it's not worth
                            // creating an attribute with a potentially incorrect
                            // default value, so just skip any undefined values
                            if (field_value !== undefined) {
                                var attribute_objects = findObjs({
                                    type: 'attribute',
                                    characterid: character_id,
                                    name: attribute_name
                                });

                                if (attribute_objects.length > 0) {
                                    if (_.has(suffix['field'], 'max') && suffix['field']['max']) {
                                        attribute_objects[0].set('max', field_value);
                                    }
                                    else {
                                        attribute_objects[0].set('current', field_value);
                                    }

                                }
                                else {
                                    if (_.has(suffix['field'], 'max') && suffix['field']['max']) {
                                        createObj('attribute', {
                                            name: attribute_name,
                                            characterid: character_id,
                                            max: field_value
                                        });
                                    }
                                    else {
                                        createObj('attribute', {
                                            name: attribute_name,
                                            characterid: character_id,
                                            current: field_value
                                        });
                                    }
                                }
                            }
                        }
                    });

                    // If an item is a weapon then it potentially has an associated
                    // attack with it, so let's see if we can find any attack
                    // definitions
                    if (item.getDefinition('purpose') === 'weapon') {
                        var attack_row_id = LootManager.generateRowID();
                        var attack_id_attribute_name = self._attack_field_mapper['prefix'] + attack_row_id + '_id';
                        var attack_attribute_fields;

                        _.each(self._attack_field_mapper['suffix'], function(suffix, key) {
                            var attribute_name = self._attack_field_mapper['prefix'] + attack_row_id + suffix['field']['name'];
                            var field_value = item.getDefinition(key);

                            // Skip past anything that shouldn't be copied
                            if (!_.has(suffix['field'], 'copy') || suffix['field']['copy']) {
                                // Roll20 really doesn't like you trying to set attributes
                                // with undefined values, and honestly it's not worth
                                // creating an attribute with a potentially incorrect
                                // default value, so just skip any undefined values
                                if (field_value !== undefined) {
                                    var attribute_objects = findObjs({
                                        type: 'attribute',
                                        characterid: character_id,
                                        name: attribute_name
                                    });

                                    if (attribute_objects.length > 0) {
                                        if (_.has(suffix['field'], 'max') && suffix['field']['max']) {
                                            attribute_objects[0].set('max', field_value);
                                        }
                                        else {
                                            attribute_objects[0].set('current', field_value);
                                        }
                                    }
                                    else {
                                        if (_.has(suffix['field'], 'max') && suffix['field']['max']) {
                                            createObj('attribute', {
                                                name: attribute_name,
                                                characterid: character_id,
                                                max: field_value
                                            });
                                        }
                                        else {
                                            createObj('attribute', {
                                                name: attribute_name,
                                                characterid: character_id,
                                                current: field_value
                                            });
                                        }
                                    }
                                }
                            }
                        });

                        // We want to make sure we don't generate an attack ID
                        // attribute unless we actually created at least one attack
                        // attribute field, so do a quick check on how many attack
                        // fields match (this is because while we're guaranteed to
                        // have item attributes as part of an item, a weapon didn't
                        // necessarily have a matching attack present in the sheet)
                        attack_attribute_fields = filterObjs(function (obj) {
                            var attack_regex = new RegExp("^" + self._attack_field_mapper['prefix'] + attack_row_id);
                            if (obj.get('type') === 'attribute' && obj.get('characterid') === character_id && attack_regex.test(obj.get('name'))) {
                                return true;
                            }
                            return false;
                        });

                        // If we have at least one attack attribute field that was
                        // created then we want to create an ID attribute for it as
                        // well
                        if (attack_attribute_fields.length > 0) {
                            createObj('attribute', {
                                name: attack_id_attribute_name,
                                characterid: character_id,
                                current: attack_row_id.toLowerCase()
                            });
                        }
                    }

                    createObj('attribute', {
                        name: item_id_attribute_name,
                        characterid: character_id,
                        current: item_row_id.toLowerCase()
                    });
                }
            });
        } // end write

        update(items) {
            var self = this;

            // If items isn't already an array, make it into one just for ease
            if (!Array.isArray(items)) {
                items = [items];
            }

            // Iterate through the items and update the attributes with whatever
            // changed in the item (in most cases this is going to be the
            // quantity, but just update all the fields to be sure)
            _.each(items, function (item) {
                if (item instanceof LootManager.class.CurrencyClass) {
                    var character_id = item.getDefinition('character_id');
                    _.each(self._currency_definitions, function (definition, key) {
                        if (key === item.getDefinition('name')) {
                            var field_value = item.getQuantity();
                            var attribute_objects = findObjs({
                                type: 'attribute',
                                characterid: character_id,
                                name: definition['field']
                            });

                            if (attribute_objects.length > 0) {
                                var field;
                                if (_.has(definition, 'max') && definition['max']) {
                                    field = 'max';
                                }
                                else {
                                    field = 'current';
                                }

                                attribute_objects[0].set(field, field_value);
                            }
                        }
                    });
                }
                else {
                    var character_id = item.getDefinition('character_id');
                    var item_row_id = item.getDefinition('item_row_id');

                    _.each(self._item_field_mapper['suffix'], function(item_suffix, item_key) {
                        var item_attribute_name = self._item_field_mapper['prefix'] + item_row_id + item_suffix['field']['name'];

                        // Skip past anything that shouldn't be copied
                        if (!_.has(item_suffix['field'], 'copy') || item_suffix['field']['copy']) {
                            // Now that we have the name of the attribute do a search
                            // so that we can get the object back
                            var item_attribute_objects = findObjs({
                                type: 'attribute',
                                characterid: character_id,
                                name: item_attribute_name
                            });

                            // We should have found something but still check to make
                            // sure there is an object returned so that we don't try
                            // to update something that's not there
                            if (item_attribute_objects.length > 0) {
                                var field_value = item.getDefinition(item_key);
                                var field;
                                if (_.has(item_suffix['field'], 'max') && item_suffix['field']['max']) {
                                    field = 'max';
                                }
                                else {
                                    field = 'current';
                                }
                                item_attribute_objects[0].set(field, field_value);
                            }

                            // Now check to see if there is an associated attack that
                            // we need to update as well (we'll have an attack row ID
                            // if an attack exists)
                            if (item.getDefinition('attack_row_id') !== undefined) {
                                var attack_row_id = item.getDefinition('attack_row_id');

                                _.each(self._attack_field_mapper['suffix'], function(attack_suffix, attack_key) {
                                    var attack_attribute_name = self._attack_field_mapper['prefix'] + attack_row_id + attack_suffix['field']['name'];

                                    // Skip past anything that shouldn't be copied
                                    if (!_.has(attack_suffix['field'], 'copy') || attack_suffix['field']['copy']) {
                                        // Now that we have the name of the attribute do a
                                        // search so that we can get the object back
                                        var attack_attribute_objects = findObjs({
                                            type: 'attribute',
                                            characterid: character_id,
                                            name: attack_attribute_name
                                        });

                                        // We should have found something but still check to
                                        // make sure there is an object returned so that we
                                        // don't try to update something that's not there
                                        if (attack_attribute_objects.length > 0) {
                                            var field_value = item.getDefinition(attack_key);
                                            if (_.has(attack_suffix['field'], 'max') && attack_suffix['field']['max']) {
                                                attack_attribute_objects[0].set('max', field_value);
                                            }
                                            else {
                                                attack_attribute_objects[0].set('current', field_value);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            });
        } // end update

        delete(items) {
            var self = this;

            // If items isn't already an array, make it into one just for ease
            if (!Array.isArray(items)) {
                items = [items];
            }

            // Iterate through the items and delete them from the character
            // supplied
            _.each(items, function (item) {
                if (item instanceof LootManager.class.CurrencyClass) {
                    var character_id = item.getDefinition('character_id');
                    _.each(self._currency_definitions, function (definition, key) {
                        if (key === item.getDefinition('name')) {
                            var attribute_objects = findObjs({
                                type: 'attribute',
                                characterid: character_id,
                                name: definition['field']
                            });

                            if (attribute_objects.length > 0) {
                                attribute_objects[0].remove();
                            }
                        }
                    });
                }
                else {
                    var character_id = item.getDefinition('character_id');
                    var item_row_id = item.getDefinition('item_row_id');

                    var item_attribute_match = self._item_field_mapper['prefix'] + item_row_id;

                    // Since we know the prefix and the row ID we can pretty
                    // safely assume that if we match the prefix and row ID
                    // when searching for attributes that all of those are
                    // associated with the item in question. This helps us
                    // get around fringe issues where maybe the character
                    // sheet gets updated with new item fields that we don't
                    // know about, because if we only delete the fields we
                    // know about then some straggler fields might get left
                    // behind and that looks pretty wonky in the character
                    // sheet.
                    var item_attribute_objects = filterObjs(function (obj) {
                        var prefix_regex = new RegExp("^" + item_attribute_match);
                        if (obj.get('type') === 'attribute' && obj.get('characterid') === character_id && prefix_regex.test(obj.get('name'))) {
                            return true;
                        }
                        return false;
                    });

                    // Go through each matching attribute object found and
                    // delete it
                    _.each(item_attribute_objects, function (obj) {
                        obj.remove();
                    });

                    // If this item is a weapon then repeat the same thing,
                    // but do it with the associated attack attributes.
                    if (item.getDefinition('attack_row_id') !== undefined) {
                        var attack_row_id = item.getDefinition('attack_row_id');
                        var attack_attribute_match = self._attack_field_mapper['prefix'] + attack_row_id;

                        var attack_attribute_objects = filterObjs(function (obj) {
                            var prefix_regex = new RegExp("^" + attack_attribute_match);
                            if (obj.get('type') === 'attribute' && obj.get('characterid') === character_id && prefix_regex.test(obj.get('name'))) {
                                return true;
                            }
                            return false;
                        });

                        // Go through each matching attribute object found
                        // and delete it
                        _.each(attack_attribute_objects, function (obj) {
                            obj.remove();
                        });
                    }
                }
            });
        } // end delete

        convertToCurrency(currency_string) {
            var credit_regex = new RegExp(/(\d+)\s*credit/, 'i');
            var upb_regex = new RegExp(/(\d+)\s*upb/, 'i');
            var currency_object = undefined;

            if (credit_regex.test(currency_string)) {
                var quantity = currency_string.match(credit_regex)[1];
                currency_object = new LootManager.class.CurrencyClass(true);
                currency_object.setDefinition('quantity', quantity, 'quantity');
                currency_object.setDefinition('singular', 'credit', 'singular');
                currency_object.setDefinition('plural', 'credits', 'plural');
                currency_object.setDefinition('name', 'credits');
            }
            else if (upb_regex.test(currency_string)) {
                var quantity = currency_string.match(upb_regex)[1];
                currency_object = new LootManager.class.CurrencyClass(true);
                currency_object.setDefinition('quantity', quantity, 'quantity');
                currency_object.setDefinition('singular', 'UPB', 'singular');
                currency_object.setDefinition('plural', 'UPBs', 'plural');
                currency_object.setDefinition('name', 'upbs');
            }

            if (currency_object !== undefined) {
                currency_object.setOfferDisplay(this._makeCurrencyOfferDisplay(currency_object));
            }

            return currency_object;
        } // end convertToCurrency
    } // end StarfinderTranslator
};

LootManagerStarfinderPlugin.checkInstall = () => {
    var script_name           = LootManagerStarfinderPlugin.script_name;
    var plugin_destination    = LootManagerStarfinderPlugin.plugin_destination;
    var version               = LootManagerStarfinderPlugin.version;
    var version_string        = version.toString();
    var last_update           = LootManagerStarfinderPlugin.last_update;
    var schema_version        = LootManagerStarfinderPlugin.schema_version;
    var schema_version_string = schema_version.toString();
    var dependencies          = {
        LootManager: {
            minimum_version: 0.2,
            version_key: 'version'
        }
    };

    log(`-=> ${script_name} v${version_string} <=-  [${new Date(last_update*1000)}]`);

    log(`  > Checking for ${script_name} dependencies`);
    _.each(dependencies, function(dependency_definition, dependency_name) {
        var dependency_minimum_version = dependency_definition['minimum_version'];
        var version_key = dependency_definition['version_key'];
        log(`    > Dependency ${dependency_name}, minimum v${dependency_minimum_version}`);
        if (!_.has(state, dependency_name)) {
            throw `Dependency Error: ${dependency_name} needs to be installed beforehand`;
        }
        if (state[dependency_name][version_key] === 'undefined' || state[dependency_name][version_key] < dependency_minimum_version) {
            var dependency_current_version = state[dependency_name][version_key];
            throw `Dependency Error: ${dependency_name} is v${dependency_current_version}, but v${dependency_minimum_version} is the minimum version required`;
        }
    });

    // Do a check to see if the plugin destination is already assigned in state
    // and, if so, that it currently has this plugin assigned to it. If not,
    // throw up a warning about trying to run two plugins at once (not
    // supported).
    if (_.has(state, plugin_destination) && state[plugin_destination]['plugin_name'] !== script_name) {
        var multiple_plugin_warning = 'WARNING: It is not supported having '
            + 'multiple LootManager plugins installed. If this is a situation '
            + 'of changing to a new plugin, please disregard this warning.'
        log(`  > ${multiple_plugin_warning}`);
        sendChat('LootManager', `/w gm ${multiple_plugin_warning}`);
    }

    if (!_.has(state, plugin_destination) || state[plugin_destination].schema_version !== schema_version) {
        log(`  > Updating Schema to v${schema_version_string} <`);
        switch(state[plugin_destination] && state[plugin_destination].schema_version) {
            default:
                state[plugin_destination] = {
                    schema_version: schema_version,
                    plugin: LootManagerStarfinderPlugin.class.LootManagerStarfinderPluginClass,
                    plugin_name: script_name
                };
                break;
        }
    }
    // Since state is serialized upon sandbox restart, we need to reassign
    // the class to the plugin otherwise plugin will be undefined
    state[plugin_destination]['plugin'] = LootManagerStarfinderPlugin.class.LootManagerStarfinderPluginClass;
}; // end checkInstall

on("ready",() => {
    LootManagerStarfinderPlugin.checkInstall();
});
