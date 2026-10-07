const MODULE_ID = "harnmaster-action-options";
const MACRO_NAME = "HarnMaster — Choose Action Option";

const CHOOSE_ACTION_OPTIONS_ACTOR_NAME = "Choose Action Options";
const CHOOSE_ACTION_OPTIONS_ACTOR_FLAG = "chooseActionOptionsActor";
const CHOOSE_ACTION_OPTIONS_INITIATIVE = 1000;

const NORMAL_ACTION_OPTIONS = [
    { id: "rest", name: "Rest", category: "primary" },
    { id: "pass", name: "Pass", category: "primary" },
    { id: "free-move", name: "Free Move", category: "primary" },
    { id: "engage", name: "Engage", category: "primary" },
    { id: "stealth-move", name: "Stealth Move", category: "primary" },
    { id: "ambush", name: "Ambush", category: "primary" },
    { id: "charge", name: "Charge", category: "primary" },
    { id: "disengage", name: "Disengage", category: "primary" },
    { id: "rise", name: "Rise", category: "primary" },
    { id: "grope", name: "Grope", category: "primary" },
    { id: "melee-attack", name: "Melee Attack", category: "primary" },
    { id: "missile-attack", name: "Missile Attack", category: "primary" },
    { id: "reload", name: "Reload", category: "primary" },
    { id: "aim-missile", name: "Aim Missile", category: "attack" },
    { id: "called-shot", name: "Called Shot", category: "attack" },
    { id: "grapple-attack", name: "Grapple Attack", category: "primary" },
    { id: "esoteric-attack", name: "Esoteric Attack", category: "primary" }
];

const MOUNTED_ACTION_OPTIONS = [
    { id: "mounted-rest", name: "Mounted Rest", category: "primary" },
    { id: "mounted-pass", name: "Mounted Pass", category: "primary" },
    { id: "mount-dismount", name: "Mount/Dismount", category: "primary" },
    { id: "mounted-move", name: "Mounted Move", category: "primary" },
    { id: "mounted-engage", name: "Mounted Engage", category: "primary" },
    { id: "mounted-charge", name: "Mounted Charge", category: "primary" },
    { id: "mounted-disengage", name: "Mounted Disengage", category: "primary" },
    { id: "rider-attack", name: "Rider Attack", category: "primary" },
    { id: "steed-trample", name: "Steed Trample", category: "primary" },
    { id: "mounted-missile-attack", name: "Mounted Missile Attack", category: "primary" },
    { id: "mounted-reload", name: "Mounted Reload", category: "primary" },
    { id: "mounted-aim-missile", name: "Mounted Aim Missile", category: "attack" },
    { id: "mounted-called-shot", name: "Mounted Called Shot", category: "attack" }
];

const ACTION_ADJUSTMENTS = [
    { id: "defensive-stance-rest", name: "Defensive Stance", parent: "rest" },
    { id: "defensive-stance-pass", name: "Defensive Stance", parent: "pass" },
    { id: "defensive-stance-mounted-rest", name: "Defensive Stance", parent: "mounted-rest" },
    { id: "defensive-stance-mounted-pass", name: "Defensive Stance", parent: "mounted-pass" },

    { id: "two-weapon-fighting", name: "Two-Weapon Fighting", parent: "melee-attack" },
    { id: "disarm", name: "Disarm", parent: "melee-attack" },
    { id: "guarded-attack", name: "Guarded Attack", parent: "melee-attack" },
    { id: "feint", name: "Feint", parent: "melee-attack" },
    { id: "strike-to-stun", name: "Strike to Stun", parent: "melee-attack" },
    { id: "all-out-attack", name: "All-Out Attack", parent: "melee-attack" },
    { id: "mighty-strike", name: "Mighty Strike", parent: "melee-attack" },
    { id: "called-strike", name: "Called Strike", parent: "melee-attack" },

    { id: "ambush-two-weapon-fighting", name: "Two-Weapon Fighting", parent: "ambush" },
    { id: "ambush-called-strike", name: "Called Strike", parent: "ambush" },

    { id: "rider-two-weapon-fighting", name: "Two-Weapon Fighting", parent: "rider-attack" },
    { id: "rider-disarm", name: "Disarm", parent: "rider-attack" },
    { id: "rider-guarded-attack", name: "Guarded Attack", parent: "rider-attack" },
    { id: "rider-feint", name: "Feint", parent: "rider-attack" },
    { id: "rider-strike-to-stun", name: "Strike to Stun", parent: "rider-attack" },
    { id: "rider-all-out-attack", name: "All-Out Attack", parent: "rider-attack" },
    { id: "rider-mighty-strike", name: "Mighty Strike", parent: "rider-attack" },
    { id: "rider-called-strike", name: "Called Strike", parent: "rider-attack" },

    { id: "charge-two-weapon-fighting", name: "Two-Weapon Fighting", parent: "charge" },
    { id: "shield-bash", name: "Shield Bash", parent: "charge" },
    { id: "charge-strike-to-stun", name: "Strike to Stun", parent: "charge" },
    { id: "charge-all-out-attack", name: "All-Out Attack", parent: "charge" },
    { id: "charge-mighty-strike", name: "Mighty Strike", parent: "charge" },

    { id: "mounted-charge-two-weapon-fighting", name: "Two-Weapon Fighting", parent: "mounted-charge" },
    { id: "mounted-shield-bash", name: "Shield Bash", parent: "mounted-charge" },
    { id: "mounted-charge-strike-to-stun", name: "Strike to Stun", parent: "mounted-charge" },
    { id: "mounted-charge-all-out-attack", name: "All-Out Attack", parent: "mounted-charge" },
    { id: "mounted-charge-mighty-strike", name: "Mighty Strike", parent: "mounted-charge" }
];

const ACTION_OPTION_DESCRIPTIONS = {
    "rest": `This option is available only to unengaged characters. The character does nothing except possibly sit or lie down. Resting characters may (within reason) attend to wounds, do minor weapon repairs, etc., and may defend normally if attacked later in the combat round.`,
    "pass": `This option is available to engaged characters who wish to forfeit their Turn. Characters taking this option may defend normally if attacked.`,
    "free-move": `Only unengaged characters may use this option. A Free Move is made at any speed up to Double Move. A character performing a Free Move may not enter an enemy Engagement Zone and must stop upon entering an enemy Reaction Zone for the first time. If the Free Move character started his move in an enemy Reaction Zone then he may move freely but still may not engage the enemy. In the course of a Free Move, characters may (within reason) change weapons, open/close doors, pick things up, etc.`,
    "engage": `An unengaged character makes a Half-Move (or less) to enter an enemy’s Engagement Zone, where he stops. Reaction Zones are irrelevant and ignored when taking an Engage Action Option. Upon completion of the move, Engage Initiative is performed for each of the newly engaged parties where they each test Initiative. If the Defender gains a higher success level, a Tactical Advantage is earned and the Attacking character’s move is finished. The defender’s Tactical Advantage can be used to Attack first, Disengage, etc. After the defender performs his Tactical Advantage then the attacker may optionally perform a Melee Attack if within range or if not his turn is finished. If the defender did not gain a Tactical Advantage then the attacker may continue his move if necessary in order to get close enough and then perform a Melee Attack.`,
    "charge": `An unengaged character makes a Full-Move (or less) to engage an enemy character and must (not optional) then conduct a Melee Attack. A Charge cannot be performed if a character starts in an enemy’s Reaction Zone. The Charge Action Option allows a combatant to ignore an enemy’s Reaction Zone and the defender only gets to use Engage Initiative if he has a long weapon reach (greater than 1 hex). Upon completion of the defender’s Tactical Advantage or if he did not gain one then the Charging character completes his move and performs his Melee Attack.`,
    "disengage": `An engaged character may disengage from melee combat. Each engaged combatant makes an Initiative test. Any enemies who score better than the disengaging character may take a Tactical Advantage. After all Tactical Advantages have been resolved the disengaging character may move one (1) hex and then, if now unengaged, makes a Half-Move. This move terminates if another enemy Reaction Zone is entered. The disengaging character may not enter another enemy’s Engagement Zone.`,
    "rise": `When a character stumbles (falls prone) a Rise option must be used to get up. The action is always successful unless the character is forcibly held down, suffering from a serious or grevious wound, etc. The GM may require an AGILITY and/or STRENGTH test to resolve these situations.`,
    "grope": `Any action taken in Combat which requires manual dexterity, but is not an attack. For example, an attempt to draw or change weapons, string a bow, dispatch an unconscious person, or retrieve an item from the ground are Grope actions. A Grope is automatically successful unless the character is forcibly held down, suffering from a serious or grevious wound, currently engaged, etc. The GM may require a DEXTERITY and/or STRENGTH test to resolve these situations.`,
    "melee-attack": `An effort to strike one engaged enemy with a melee weapon. Engaged characters can move one (1) hex and then make a Melee Attack on any opponent they now engage. Melee Attacks are resolved with the Melee Attack Sequence (COMBAT 9).`,
    "stealth-move": `An unengaged character makes a Full-Move (or less) in an attempt to close the distance to his enemy while remaining undetected. A Stealth test must be succeeded in order to continue with this Action Option. If the stealth test is failed then the character may perform a normal Engage Action Option. Upon successful stealth the character moves to the Reaction Zone of the enemy where the enemy gets to perform an Awareness test to detect the ambusher. The GM may apply modifiers to either Stealth or Awareness tests. Typical modifiers to either Stealth or Awareness EML would be -10 to -50 for lighting, cover, distractions, or other factors. If the opponent’s Awareness test succeeds then he is aware of the ambusher, the ambusher's movement is finished in the location he is currently and his turn ends. While the victim is aware of the ambusher and the Ambush Action Option is impossible. The Ambusher may move away next turn and then attempt to stealthily approach again (with another Stealth Move) for another Ambush attempt. If the Awareness test fails then the ambusher may continue his move until he is adjacent to his victim. Then he may immediately conduct an Ambush Action Option.`,
    "ambush": `This is a melee attack (never a missile attack) that is available only when the target or victim of the attack is unaware of the attack. The target or victim may only use the 'Ignore' defense and the ambusher may add his Stealth SB x 2 to his weapon EML when determining if the attack is a success and may add his weapon skill SI x 2 to his Strike Impact (ie: before armor is subtracted). After this ambush is performed the victim is aware of the ambusher and no more Ambush Action Options may be performed without disengaging, moving away, becoming stealthy again, and re-engaging.`,
    "missile-attack": `This option is only available to characters equipped with a missile weapon (which includes just about any throw-able item) that is loaded and ready to fire. Unprepared missile weapons (unstrung, packed, etc.) must be prepared by means of a Grope and cannot be used until the next turn. A missile weapon must be readied and then loaded. Thrown weapons are considered ready (ie: loaded) after 1 Grope or Reload Action Option. Attacks are resolved with the Missile Attack Sequence (COMBAT 15). After firing or throwing the missile weapon it must be reloaded to fire/throw again.`,
    "reload": `All Missile weapons must be ‘readied’ before throwing or firing. This is done with a Reloading Action Option. The Reload Action Option is a special form of Grope and the GM can require a test to determine success depending on circumstances. All missile weapons except crossbow maybe be reloaded in 1 round (ie: shoot 1 round and reload the next). The rounds required to reload a crossbow depends on the STR of the crossbow compared to the STR of the wielding character as below: • Crossbow STR is <= Character STR: Character can reload the crossbow in 1 combat round and shoot the next. This STR Crossbow can be reloaded while mounted but with +1 round to reload (for a total of 2 rounds). • Crossbow STR is 1 or 2 greater than Character STR: Character must spend 2 rounds reloading the crossbow and may shoot every 3rd round. This STR Crossbow cannot be reloaded while mounted. • Crossbow STR is >= 3 more than Character STR: Character must use a mechanical device called a goats’ foot to reload the crossbow. The crossbow cannot be reloaded without this device. The time to reload is 3 rounds. The crossbow may be fired every 4th round. This STR crossbow cannot be reloaded while mounted.`,
    "grapple-attack": `Any attempt to grapple, hold, or wrestle with one engaged opponent using Unarmed Combat as a skill. The Attacker may (if possible) move one hex before attempting a Grapple. The Defender may counter with any Defense (including Grapple). If the grappler achieves any “Strike” result, a hold on the opponent has been gained. Each character then rolls 3d6 + Strength - Physical Penalty. The character with the highest total (re-roll ties) is assumed to have thrown the other to the ground and wins a Tactical Advantage.`,
    "esoteric-attack": `This option is available to characters capable of using magic or psionics, or to those who wish to call for divine intervention. An esoteric attack may not (at GM discretion) be available to engaged characters. If an esoteric attack takes more than 10 seconds to prepare, it must be readied over several turns. Note: The use of magic, psionics, or divine aid in combat/crisis situations is always governed by GM discretion.`,
    "mounted-rest": `This option is available only to unengaged riders. The rider does nothing except possibly sit or remain quietly mounted. Mounted riders may (within reason) attend to wounds, do minor weapon repairs, etc., and may defend normally if attacked later in the combat round.`,
    "mounted-pass": `This option is available to all characters who wish to forfeit their Turn. If unengaged, this option may include a GROPE (COMBAT 7). Riders may defend normally if attacked.`,
    "mount-dismount": `Mount or dismount in combat. With CS, the rider gains a tactical advantage. Any failure requires an UNHORSING roll.`,
    "mounted-move": `Only unengaged riders may use this option. A Mounted Move is made at any of the four speeds, but may NOT enter an enemy’s Engagement Zone and must stop upon entering an enemy Reaction Zone for the first time. If the rider started his move in an enemy Reaction Zone then he may move freely but still may not engage the enemy. In the course of a Mounted Move, riders may (within reason) change weapons, open/close doors, pick things up, etc. This option may also include a Grope or Missile Attack (COMBAT 15).`,
    "mounted-engage": `An unengaged rider makes a WALK or TROT move to enter an enemy’s Engagement Zone, where he stops. Reaction Zones are irrelevant and ignored when taking an Engage Action Option. Upon completion of the move, Engage Initiative is performed for each of the newly engaged parties where they each test Initiative. If the Defender gains a higher success level, a Tactical Advantage is earned and the Attacking rider’s move is finished. The defender’s Tactical Advantage can be used to Attack first, Disengage, etc. After the defender performs his Tactical Advantage then the rider may optionally perform a Rider Attack or Steed Trample if within range or if not his turn is finished. If the defender did not gain a Tactical Advantage then the rider may continue his move if necessary in order to get close enough and then perform a Rider Attack or Steed Trample.`,
    "mounted-charge": `An unengaged rider makes a CANTER or GALLOP move to engage an enemy afoot or mounted. The charge distance cannot be less than one half the maximum CANTER (or GALLOP) move, and must follow a straight path to engage. A Galloping charge requires a steed stumble roll. A Mounted Charge cannot be performed if the rider starts in an enemy’s Reaction Zone. The Mounted Charge Action Option allows a rider to ignore an enemy’s Reaction Zone and the defender only gets to use Engage Initiative if he has a long weapon reach (greater than 1 hex). Upon completion of the defender’s Tactical Advantage or if he did not gain one then the Charging rider completes his move and performs the required Mounted Charge attack actions below. The steed must halt when it enters an Engagement Zone, and a mandatory Steed Trample at +20 is executed against any enemy afoot in the path of the steed. The Rider may (optional) also conduct a Rider Attack (see below). Trample and weapon impacts (for both sides) are +1d6 (Canter) and 2d6 Gallop). That is, an AX2 strike becomes Ax3 on a Canter charge and Ax4 on a Gallop. Regardless of the outcome, the steed must advance one (1) hex to displace the opponent being trampled (if any). A tactical advantage must be gained from the steed trample to continue moving. Otherwise, the steed halts, which could leave the rider and steed in the middle of a somewhat hostile crowd.`,
    "mounted-disengage": `An engaged rider may disengage from melee combat. Each engaged combatant makes an Initiative test. Any enemies who score better than the disengaging rider may take a Tactical Advantage. After all Tactical Advantages have been resolved the disengaging rider may wheel (turn in place), move the steed one or two hexes, and then, if now unengaged, make a WALK or TROT move. This move terminates if another enemy Reaction Zone is entered. The disengaging rider may not enter another enemy’s Engagement Zone.`,
    "rider-attack": `A rider may attack one (1) adjacent enemy, mounted or afoot. If already engaged, the steed can move one or two hexes before the attack is made. A Rider Attack may also occur during a MOUNTED ENGAGE or MOUNTED CHARGE. A second Rider Attack in the same combat turn requires a Rider Tactical Advantage (see below). Rider attacks are resolved normally on the Melee Attack Table, using the applicable weapon AML. The GM may restrict the hexes which can be attacked by the rider according to the length of the weapon and hand used. A lance may attack ANY adjacent hex, but a 3-foot long sword or mace held in the right hand has restrictions at GM discretion. The GM may also apply discretionary Aiming Zone modifiers for the rider and warrior afoot.`,
    "steed-trample": `An attack by the Steed, commanded by the Rider. The Defender may be located in ANY hex adjacent to the steed — horses can wheel and kick in any direction (especially backwards) with great force. Steed Trample may be quite useful if the rider is injured, or has dropped a weapon. A steed trample is like a Melee Attack. The steed rolls against Trample ML, modified for mounted charge (+20) and/or steed physical penalty. The Defender may use any defense, even a BLOCK. However, the defender holds the hex only if successfully trampled! With ANY other result, the Defender must move 1 hex to either side, regardless of the situation. With a DTA the Defender must still move to one side and then exercise the TA.`
};

const ATTACK_OPTION_DESCRIPTIONS = {
    "defensive-stance-rest": `A Defensive Stance is like a Guarded Attack but the fighter may do nothing else in that round than Parry or Dodge. These are made with +20 EML.`,
    "defensive-stance-pass": `A Defensive Stance is like a Guarded Attack but the fighter may do nothing else in that round than Parry or Dodge. These are made with +20 EML.`,
    "defensive-stance-mounted-rest": `A Defensive Stance is like a Guarded Attack but the fighter may do nothing else in that round than Parry or Dodge. These are made with +20 EML.`,
    "defensive-stance-mounted-pass": `A Defensive Stance is like a Guarded Attack but the fighter may do nothing else in that round than Parry or Dodge. These are made with +20 EML.`,
    "two-weapon-fighting": `Using two weapons in combat allows one additional attack in the same round, but both attacks are made with -20 EML. Any Hand Move Penalties apply. If a character uses both weapons for attack, his next Block in that round is made with -10 EML. If Blocking with both weapons only one defense roll is made against every attack, but the Defense Classes of both weapons are added together (to a maximum of 5). Any Hand Move Penalties are added together as a penalty to the defense roll. Even when using two weapons only one Counterstrike per incoming attack is permitted. In the case of a Weapon Damage Check, the primary weapon is tested on an even defense roll, the secondary weapon on an odd defense roll. If the Combat Tables shows a “DF” result, the defender makes a Fumble Roll for the primary weapon on an even defense roll, for the secondary weapon on an odd defense roll. If Two-Weapon Fighting is combined with another Attack Option then the other Attack Option applies to both weapon attacks.`,
    "disarm": `When a fighter is trying to disarm an opponent he declares a Disarm before making his attack roll, which is made with -20 EML and always strikes the opponent’s weapon on a Strike result. To determine if the opponent loses his weapon he makes a Fumble Roll (against DEX+2 if the weapon is used 2-handed, DEX+5 if strapped) by rolling as many dice (Strike Dice and weapon impact dice) and all the modifiers as if the attacker would roll for impact. Only the Blunt or Edge Aspect of the weapon can be used. If the result is a Fumble, the target loses his weapon.`,
    "guarded-attack": `When using a Guarded Attack a character is fighting with a higher priority to self-defense than to hit an opponent. A Guarded Attack must be declared at the beginning of a round. The fighter then gets +10 EML on his Parry or Dodge, but all his attacks in that round (even TAs) are made with -10 EML. He may not choose Counterstrike as defense nor use Called Strike, Feint or Mighty Strike. A Guarded Attack may only be used while actually fighting, not while casting a spell or using a skill.`,
    "feint": `With a Feint the attacker makes it harder for his opponent to defend against his blows. The attacker declares a penalty to his attack roll (-10, -20, etc.) up to ½ ML and the defender gets the same penalty to his defense roll. The attack is then made with a penalty of -20 to Initiative. If the attacker is using two weapons for the Feint, the defender gets an additional penalty of -10 EML.`,
    "strike-to-stun": `With a Strike to Stun the attacker tries to knock out the opponent instead of killing him. In order to deliver a successful Strike to Stun the opponent’s head (skull, face or neck) must be hit (best done with a Called Strike). The attacker rolls to hit at -20 EML (-0 EML if the target is not moving and unaware) in addition to any other penalty. On a successful strike the attacker can decide how many dice he wants to roll (the maximum is defined by the A★ result and the weapon’s blunt damage). Any other modifier (like strength or weapon impact bonus) is added or deducted as usual. The resulting impact is then used with the Blunt Aspect Injury Table to determine the severity of the wound and the Injury Points like for a normal strike, but additionally the target gets [Effective Impact] Fatigue Points. Any head armour protection values are doubled and at least 1 IP must be delivered to cause any effect. After calculating the new UPI, a Shock Roll is made as shown in the Injury Table with one extra d6. If any hit location other than the skull, face or neck is hit, the strike is treated like a normal strike but with the reduced impact.`,
    "all-out-attack": `This is the opposite of a Guarded Attack, the attacker neglects his own safety in order to hit the target. An All-Out Attack must be declared at the beginning of a round. The fighter then gets +20 EML on all his attacks and Counterstrikes during that round, but may not choose Dodge or Parry as defense and all opponents striking at him get +20 EML to their attacks. An All-Out Attack cannot be combined with other combat maneuvers.`,
    "mighty-strike": `With a Mighty Strike the attacker is giving up accuracy for an increased impact. For -20 to Initiative and Attack EML the total impact is increased by +1d6. If the attacking weapon is used for defense, this is made with -20 EML. Mighty Strike may only be used when swinging a weapon.`,
    "called-strike": `With a Called Strike the attacker could target a specific strike location. To use the Called Strike, he must have a drawn and ready weapon. The attacker then chooses the Aiming Zone (High, Mid or Low) that is best fitting the strike location he wants to hit (e.g. High for face, with -10 EML for the High column). Now he can use Targeting Points (TP) to modify the roll on the Melee Strike Location Table after a successful hit: For every -10 to Attack EML (not including the Aiming Zone penalty) the roll can be modified by +10 or -10 TP to reach the targeted strike location. For an additional -10 left or right side can be chosen. A Called Strike cannot be used as Counterstrike or as result of a TA.`,
    "ambush-two-weapon-fighting": `Using two weapons in combat allows one additional attack in the same round, but both attacks are made with -20 EML. Any Hand Move Penalties apply. If Two-Weapon Fighting is combined with another Attack Option then the other Attack Option applies to both weapon attacks.`,
    "ambush-called-strike": `With a Called Strike the attacker could target a specific strike location. To use the Called Strike, he must have a drawn and ready weapon. The attacker then chooses the Aiming Zone that best fits the desired strike location and uses Targeting Points to modify the strike location after a successful hit. A Called Strike cannot be used as Counterstrike or as result of a TA.`,
    "aim-missile": `An archer can choose to use a full round for Aiming, so the actual fire takes place in the next turn as the archer’s next action with +10 EML. With a crossbow up to 3 rounds could be used, giving an extra +10 EML per round (up to +30). Aiming can only be used on slow moving targets, but it can be used in combination with a Called Shot.`,
    "called-shot": `To use a Called Shot the attacker must have a drawn throwing weapon or braced bow or crossbow and must have a clear view of the target hit location. It can only be used on slow moving targets. The procedure is the same as with a Called Strike, but the new Missile Strike Location Tables are used and the attacker must use 10 seconds for targeting, so the actual fire takes place in the next turn, just before his next action. A Called Shot can be used together with Aiming.`,
    "mounted-aim-missile": `An archer can choose to use a full round for Aiming, so the actual fire takes place in the next turn as the archer’s next action with +10 EML. With a crossbow up to 3 rounds could be used, giving an extra +10 EML per round (up to +30). Aiming can only be used on slow moving targets, but it can be used in combination with a Called Shot.`,
    "mounted-called-shot": `To use a Called Shot the attacker must have a drawn throwing weapon or braced bow or crossbow and must have a clear view of the target hit location. It can only be used on slow moving targets. The procedure is the same as with a Called Strike, but the new Missile Strike Location Tables are used and the attacker must use 10 seconds for targeting, so the actual fire takes place in the next turn, just before his next action. A Called Shot can be used together with Aiming.`,
    "shield-bash": `Shield Bash is a form of melee attack that may be used at the end of a Charge Action Option only. The character must have a shield equipped. Character replaces his shield’s WAC with the following formula that includes the shield weight: WAC = WAC + (WT × 2). Determine attack/defense outcome. If the Shield Bashing character scores a strike then determine Hit Location and Strike Impact normally. Determine Knockback using Strike Impact instead of Effective Impact. Determine Effective Impact and Injury as normal. If Weapon Damage and Partial Damage optional rules are used then apply both to the shield immediately following the attack. Shields can shatter and will definitely be damaged if used in this way.`,
    "charge-two-weapon-fighting": `Using two weapons in combat allows one additional attack in the same round, but both attacks are made with -20 EML. Any Hand Move Penalties apply. If Two-Weapon Fighting is combined with another Attack Option then the other Attack Option applies to both weapon attacks.`,
    "charge-strike-to-stun": `With a Strike to Stun the attacker tries to knock out the opponent instead of killing him. In order to deliver a successful Strike to Stun the opponent’s head must be hit. The attacker rolls to hit at -20 EML in addition to any other penalty and uses the Blunt Aspect Injury Table for the resulting impact.`,
    "charge-all-out-attack": `This is the opposite of a Guarded Attack, the attacker neglects his own safety in order to hit the target. An All-Out Attack must be declared at the beginning of a round. The fighter then gets +20 EML on all his attacks and Counterstrikes during that round, but may not choose Dodge or Parry as defense and all opponents striking at him get +20 EML to their attacks.`,
    "charge-mighty-strike": `With a Mighty Strike the attacker is giving up accuracy for an increased impact. For -20 to Initiative and Attack EML the total impact is increased by +1d6. If the attacking weapon is used for defense, this is made with -20 EML. Mighty Strike may only be used when swinging a weapon.`,
    "mounted-charge-two-weapon-fighting": `Using two weapons in combat allows one additional attack in the same round, but both attacks are made with -20 EML. Any Hand Move Penalties apply.`,
    "mounted-shield-bash": `Shield Bash is a form of melee attack that may be used at the end of a Charge Action Option only. The character must have a shield equipped.`,
    "mounted-charge-strike-to-stun": `With a Strike to Stun the attacker tries to knock out the opponent instead of killing him. The attacker rolls to hit at -20 EML in addition to any other penalty and uses the Blunt Aspect Injury Table for the resulting impact.`,
    "mounted-charge-all-out-attack": `This is the opposite of a Guarded Attack, the attacker neglects his own safety in order to hit the target. The fighter gets +20 EML on all his attacks and Counterstrikes during that round, but may not choose Dodge or Parry as defense and all opponents striking at him get +20 EML to their attacks.`,
    "mounted-charge-mighty-strike": `With a Mighty Strike the attacker is giving up accuracy for an increased impact. For -20 to Initiative and Attack EML the total impact is increased by +1d6. If the attacking weapon is used for defense, this is made with -20 EML. Mighty Strike may only be used when swinging a weapon.`,
    "rider-two-weapon-fighting": `Using two weapons in combat allows one additional attack in the same round, but both attacks are made with -20 EML. Any Hand Move Penalties apply.`,
    "rider-disarm": `When a fighter is trying to disarm an opponent he declares a Disarm before making his attack roll, which is made with -20 EML and always strikes the opponent’s weapon on a Strike result. If the result is a Fumble, the target loses his weapon.`,
    "rider-guarded-attack": `When using a Guarded Attack a character is fighting with a higher priority to self-defense than to hit an opponent. The fighter gets +10 EML on Parry or Dodge, but all his attacks in that round are made with -10 EML.`,
    "rider-feint": `With a Feint the attacker makes it harder for his opponent to defend against his blows. The attacker declares a penalty to his attack roll and the defender gets the same penalty to his defense roll. The attack is then made with a penalty of -20 to Initiative.`,
    "rider-strike-to-stun": `With a Strike to Stun the attacker tries to knock out the opponent instead of killing him. The attacker rolls to hit at -20 EML in addition to any other penalty and uses the Blunt Aspect Injury Table.`,
    "rider-all-out-attack": `This is the opposite of a Guarded Attack, the attacker neglects his own safety in order to hit the target. The fighter gets +20 EML on all his attacks and Counterstrikes during that round, but may not choose Dodge or Parry as defense and all opponents striking at him get +20 EML to their attacks.`,
    "rider-mighty-strike": `With a Mighty Strike the attacker is giving up accuracy for an increased impact. For -20 to Initiative and Attack EML the total impact is increased by +1d6.`,
    "rider-called-strike": `With a Called Strike the attacker could target a specific strike location. The attacker chooses the appropriate Aiming Zone and may use Targeting Points to reach the targeted strike location. A Called Strike cannot be used as Counterstrike or as result of a TA.`
};

const ACTION_OPTIONS = [
    ...NORMAL_ACTION_OPTIONS,
    ...MOUNTED_ACTION_OPTIONS.filter(
        option => !NORMAL_ACTION_OPTIONS.some(
            normal => normal.id === option.id
        )
    )
];

const SOCKET_NAME = `module.${MODULE_ID}`;

const CONCEALED_MARKER_FLAG = "concealedActionOption";
const CONCEALED_MARKER_IMAGE =
    `modules/${MODULE_ID}/assets/action-options/action-option-hidden.webp`;

const REVEALED_ACTION_OPTION_FLAG = "revealedActionOption";

/*
 * Revealed Action Option token graphics use the Action Option id as
 * the filename. For example:
 *
 *   assets/action-options/charge.webp
 *   assets/action-options/melee-attack.webp
 *   assets/action-options/mounted-charge.webp
 *
 * This keeps the graphic mapping simple and allows the token artwork
 * to be replaced without changing the JavaScript.
 */
const REVEALED_ACTION_OPTION_IMAGE_ROOT =
    `modules/${MODULE_ID}/assets/action-options`;

const CONCEALED_MARKER_SIZE = 0.5;
const CONCEALED_MARKER_GAP = 0.04;


/* ============================================================
 * ACTION OPTION HOVER TOOLTIP
 * ============================================================
 *
 * Action Option and Missed Initiative graphics are Scene Tiles.
 *
 * We deliberately do NOT rely on Foundry's Tile hover hooks or on
 * Pixi pointer events here. The module's marker Tiles are locked,
 * and their interaction state can vary depending on which Canvas
 * layer is active.
 *
 * Instead, a lightweight document-level pointer tracker converts the
 * browser pointer position into Canvas coordinates and checks the
 * actual bounds of the module's rendered Tile objects. This makes
 * the tooltip independent of Tile edit/control mode.
 */
const ACTION_OPTION_TOOLTIP_ID = "harnmaster-action-options-tooltip";
let actionOptionHoverTile = null;
let actionOptionTooltipPointerMoveAttached = false;

function getActionOptionTooltipElement() {
    let tooltip = document.getElementById(ACTION_OPTION_TOOLTIP_ID);
    if (tooltip) return tooltip;

    tooltip = document.createElement("div");
    tooltip.id = ACTION_OPTION_TOOLTIP_ID;

    Object.assign(tooltip.style, {
        position: "fixed",
        zIndex: "10000",
        display: "none",
        pointerEvents: "none",
        padding: "5px 9px",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        borderRadius: "4px",
        background: "rgba(20, 20, 20, 0.95)",
        color: "#eeeeee",
        fontFamily: "Signika, sans-serif",
        fontSize: "14px",
        lineHeight: "1.2",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.45)"
    });

    document.body.appendChild(tooltip);
    return tooltip;
}

function hideActionOptionTooltip() {
    const tooltip = document.getElementById(ACTION_OPTION_TOOLTIP_ID);
    if (tooltip) tooltip.style.display = "none";
    actionOptionHoverTile = null;
}

function moveActionOptionTooltip(clientX, clientY) {
    const tooltip = getActionOptionTooltipElement();
    if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return;

    const offset = 14;
    const margin = 8;
    let left = clientX + offset;
    let top = clientY + offset;

    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;

    if (left + width + margin > window.innerWidth) {
        left = clientX - width - offset;
    }

    if (top + height + margin > window.innerHeight) {
        top = clientY - height - offset;
    }

    tooltip.style.left = `${Math.max(margin, left)}px`;
    tooltip.style.top = `${Math.max(margin, top)}px`;
}

function getActionOptionTooltipText(tile) {
    const document = tile?.document ?? tile;

    const revealed = document?.getFlag?.(
        MODULE_ID,
        REVEALED_ACTION_OPTION_FLAG
    );

    if (revealed) {
        const actionOptionId = revealed.actionOptionId;
        if (actionOptionId) {
            return (
                getActionOption(actionOptionId)?.name ??
                getActionAdjustment(actionOptionId)?.name ??
                actionOptionId
            );
        }
    }

    const concealed = document?.getFlag?.(
        MODULE_ID,
        CONCEALED_MARKER_FLAG
    );

    if (concealed) return "Action Option";

    const missed = document?.getFlag?.(
        MODULE_ID,
        MISSED_INITIATIVE_MARKER_FLAG
    );

    if (missed) {
        const failures = Math.max(
            0,
            Number(missed.consecutiveFailures) || 0
        );

        if (failures <= 1) return "Missed Initiative";

        return `Missed Initiative (+${getMissedInitiativeBonus(failures)})`;
    }

    return null;
}

function isActionOptionTooltipTile(tile) {
    return Boolean(getActionOptionTooltipText(tile));
}

function getHoveredActionOptionTile(clientX, clientY) {
    if (!canvas?.ready || !canvas?.tiles) return null;

    let canvasPoint;

    try {
        canvasPoint = canvas.canvasCoordinatesFromClient({
            x: clientX,
            y: clientY
        });
    }
    catch (error) {
        console.debug(
            `${MODULE_ID} | Could not convert pointer position to Canvas coordinates`,
            error
        );
        return null;
    }

    if (!canvasPoint) return null;

    /*
     * Check in reverse order so that if module markers overlap one
     * another, the uppermost marker is the one whose name is shown.
     */
    const tiles = [
        ...(canvas.tiles.placeables ?? [])
    ].reverse();

    for (const tile of tiles) {
        if (!isActionOptionTooltipTile(tile)) continue;
        if (tile.isVisible === false) continue;

        const bounds = tile.bounds;
        if (!bounds?.contains?.(canvasPoint.x, canvasPoint.y)) continue;

        return tile;
    }

    return null;
}

function handleActionOptionTooltipPointerMove(event) {
    const clientX = Number(event?.clientX);
    const clientY = Number(event?.clientY);

    if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
        return;
    }

    const tile = getHoveredActionOptionTile(
        clientX,
        clientY
    );

    if (tile) {
        if (actionOptionHoverTile !== tile) {
            actionOptionHoverTile = tile;

            const tooltip = getActionOptionTooltipElement();
            tooltip.textContent =
                getActionOptionTooltipText(tile) ?? "";
            tooltip.style.display = "block";
        }

        moveActionOptionTooltip(
            clientX,
            clientY
        );
        return;
    }

    if (actionOptionHoverTile) {
        hideActionOptionTooltip();
    }
}

function attachActionOptionTooltipPointerMove() {
    if (actionOptionTooltipPointerMoveAttached) return;

    document.addEventListener(
        "pointermove",
        handleActionOptionTooltipPointerMove,
        { passive: true }
    );

    actionOptionTooltipPointerMoveAttached = true;
}

Hooks.once(
    "ready",
    () => {
        attachActionOptionTooltipPointerMove();
        hideActionOptionTooltip();
    }
);

Hooks.on(
    "canvasReady",
    () => {
        hideActionOptionTooltip();
    }
);


/* Missed Initiative marker artwork and runtime streak tracking. */
const MISSED_INITIATIVE_MARKER_FLAG = "missedInitiative";
const MISSED_INITIATIVE_IMAGE_ROOT =
    `modules/${MODULE_ID}/assets/action-options/missed-initiative`;
const missedInitiativeStates = new Map();

/*
 * GM-only in-memory storage.
 *
 * The actual Action Option selection is deliberately NOT stored
 * in an Actor flag, Token flag, Scene flag, or other public data.
 */
const hiddenActionSelections = new Map();

/*
 * Tracks combat turns which have already had their Initiative test
 * processed during the current Foundry session.
 *
 * This prevents multiple updateCombat events from causing duplicate
 * Initiative tests and duplicate chat messages.
 */
const processedCombatTurns = new Set();

/*
 * Cached reference to HarnMaster's DiceHM3 class.
 *
 * This is loaded dynamically from the current Foundry server rather
 * than hardcoding localhost, a port, or a hostname.
 */
let DiceHM3 = null;

/* Prevent multiple combat-start events from creating duplicate setup data. */
let chooseActionOptionsSetupPromise = null;

/* Token UUID of the character whose turn was processed most recently. */
let previousActionOptionTurnTokenUuid = null;


/* ============================================================
 * BASIC HELPERS
 * ============================================================ */

function getActionOption(id) {
    return ACTION_OPTIONS.find(
        option => option.id === id
    );
}


function getActionAdjustment(id) {
    return ACTION_ADJUSTMENTS.find(
        adjustment => adjustment.id === id
    );
}


function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeChatHTML(value) {
    return escapeHTML(value);
}


function normalizeActionSelection(selection) {
    return {
        options: [
            ...new Set(
                Array.isArray(selection?.options)
                    ? selection.options
                    : []
            )
        ],
        adjustments: [
            ...new Set(
                Array.isArray(selection?.adjustments)
                    ? selection.adjustments
                    : []
            )
        ]
    };
}


function createEmptyActionSelection() {
    return {
        options: [],
        adjustments: []
    };
}


/* ============================================================
 * HARNMASTER DICE
 * ============================================================ */

/*
 * Load HarnMaster's DiceHM3 class.

 * We intentionally construct the URL from window.location.origin.
 * This means the module works whether Foundry is running on:
 *
 *     http://localhost:30000
 *     http://192.168.x.x:30000
 *     https://some-server.example.com
 *
 * or another Foundry server address.
 */
async function getDiceHM3() {

    if (DiceHM3) {
        return DiceHM3;
    }

    const diceModuleUrl = new URL(
        "/systems/hm3/module/dice-hm3.js",
        window.location.origin
    ).href;

    const diceModule = await import(diceModuleUrl);

    if (!diceModule?.DiceHM3) {
        throw new Error(
            "HarnMaster DiceHM3 could not be loaded."
        );
    }

    DiceHM3 = diceModule.DiceHM3;

    return DiceHM3;
}


/* ============================================================
 * ACTION OPTION COMPATIBILITY
 * ============================================================ */

function areActionOptionsCompatible(optionIds) {
    const ids = [...new Set(optionIds ?? [])];

    if (ids.length === 0) return true;

    const primaryIds = ids.filter(
        id => getActionOption(id)?.category === "primary"
    );

    if (primaryIds.length > 1) {
        return false;
    }

    const primary = primaryIds[0];
    const attackIds = ids.filter(
        id => getActionOption(id)?.category === "attack"
    );

    for (const id of attackIds) {
        const valid =
            (primary === "missile-attack" &&
                (id === "aim-missile" || id === "called-shot")) ||
            (primary === "mounted-missile-attack" &&
                (id === "mounted-aim-missile" || id === "mounted-called-shot"));

        if (!valid) return false;
    }

    if (primary === "missile-attack") {
        return attackIds.every(
            id => id === "aim-missile" || id === "called-shot"
        );
    }

    if (primary === "mounted-missile-attack") {
        return attackIds.every(
            id => id === "mounted-aim-missile" || id === "mounted-called-shot"
        );
    }

    return attackIds.length === 0;
}

/* ============================================================
 * ADJUSTMENT AVAILABILITY
 * ============================================================ */

function isAdjustmentAvailable(
    adjustmentId,
    optionIds
) {
    const adjustment = getActionAdjustment(adjustmentId);
    if (!adjustment) return false;
    return optionIds.includes(adjustment.parent);
}

/* ============================================================
 * VALIDATE ACTION SELECTION
 * ============================================================ */

function validateActionSelection(selection) {
    if (!selection) {
        return { valid: false, reason: "No Action Option selection was supplied." };
    }

    const optionIds = Array.isArray(selection.options) ? selection.options : [];
    const adjustmentIds = Array.isArray(selection.adjustments) ? selection.adjustments : [];

    if (optionIds.length === 0) {
        return { valid: false, reason: "You must select an Action Option." };
    }

    for (const id of optionIds) {
        if (!getActionOption(id)) {
            return { valid: false, reason: `Unknown Action Option: ${id}` };
        }
    }

    if (!areActionOptionsCompatible(optionIds)) {
        return { valid: false, reason: "The selected Action Options cannot be combined." };
    }

    for (const id of adjustmentIds) {
        const adjustment = getActionAdjustment(id);
        if (!adjustment) {
            return { valid: false, reason: `Unknown Attack Option: ${id}` };
        }
        if (!isAdjustmentAvailable(id, optionIds)) {
            return { valid: false, reason: `${adjustment.name} is not available with the selected Action Option.` };
        }
    }

    const primary = optionIds.find(
        id => getActionOption(id)?.category === "primary"
    );

    /* Defensive Stance is mutually exclusive with every other Attack Option. */
    const defensiveIds = [
        "defensive-stance-rest",
        "defensive-stance-pass",
        "defensive-stance-mounted-rest",
        "defensive-stance-mounted-pass"
    ];
    if (adjustmentIds.some(id => defensiveIds.includes(id)) && adjustmentIds.length > 1) {
        return { valid: false, reason: "Defensive Stance is mutually exclusive with all other Attack Options." };
    }

    /* Melee Attack: Two-Weapon Fighting may combine with exactly one other option. */
    if (primary === "melee-attack") {
        const meleeIds = adjustmentIds.filter(id =>
            ACTION_ADJUSTMENTS.some(a => a.parent === "melee-attack" && a.id === id)
        );
        const hasTWF = meleeIds.includes("two-weapon-fighting");
        if (hasTWF && meleeIds.length > 2) {
            return { valid: false, reason: "Two-Weapon Fighting may be combined with only one other Melee Attack option." };
        }
        if (!hasTWF && meleeIds.length > 1) {
            return { valid: false, reason: "Only one Melee Attack option may be selected unless Two-Weapon Fighting is also selected." };
        }
    }

    /* Ambush: Two-Weapon Fighting and Called Strike may be combined. */
    if (primary === "ambush") {
        const allowed = ["ambush-two-weapon-fighting", "ambush-called-strike"];
        if (adjustmentIds.some(id => !allowed.includes(id))) {
            return { valid: false, reason: "Only Two-Weapon Fighting and Called Strike are available with Ambush." };
        }
    }

    /* Charge and Mounted Charge: one from Group A and/or one from Group B. */
    if (primary === "charge" || primary === "mounted-charge") {
        const prefix = primary === "charge" ? "" : "mounted-";
        const groupA = [
            `${prefix}charge-two-weapon-fighting`,
            `${prefix}shield-bash`
        ];
        const groupB = [
            `${prefix}charge-strike-to-stun`,
            `${prefix}charge-all-out-attack`,
            `${prefix}charge-mighty-strike`
        ];
        const selectedA = adjustmentIds.filter(id => groupA.includes(id));
        const selectedB = adjustmentIds.filter(id => groupB.includes(id));
        if (selectedA.length > 1) return { valid: false, reason: "Two-Weapon Fighting and Shield Bash are mutually exclusive." };
        if (selectedB.length > 1) return { valid: false, reason: "Strike to Stun, All-Out Attack, and Mighty Strike are mutually exclusive." };
    }

    return { valid: true, reason: null };
}

/* ============================================================
 * TOKEN / CHARACTER HELPERS
 * ============================================================ */

function getSelectedCharacter() {

    const controlledTokens =
        canvas?.tokens?.controlled ?? [];

    if (
        controlledTokens.length !== 1
    ) {
        return null;
    }

    const token =
        controlledTokens[0];

    if (!token?.actor) {
        return null;
    }

    return {
        token,
        actor: token.actor
    };
}


function userOwnsCharacter(actor) {

    if (
        !actor ||
        !game?.user
    ) {
        return false;
    }

    /*
     * Any permission level other than NONE qualifies.
     */
    return actor.testUserPermission(
        game.user,
        "LIMITED"
    );
}


/* ============================================================
 * MISSED INITIATIVE TRACKING / MARKER
 * ============================================================ */

function getMissedInitiativeFailureCount(tokenUuid) {
    return Math.max(0, Number(missedInitiativeStates.get(tokenUuid) ?? 0));
}

function getMissedInitiativeBonus(failureCount) {
    const failures = Math.max(0, Number(failureCount) || 0);
    return failures <= 1 ? 0 : (failures - 1) * 10;
}

function getMissedInitiativeImage(failureCount) {
    const failures = Math.max(0, Number(failureCount) || 0);
    if (failures <= 0) return null;
    if (failures === 1) {
        return `${MISSED_INITIATIVE_IMAGE_ROOT}/failed-last-ini.webp`;
    }
    const displayedBonus = Math.min(getMissedInitiativeBonus(failures), 70);
    return `${MISSED_INITIATIVE_IMAGE_ROOT}/ini-plus-${displayedBonus}.webp`;
}

function getMissedInitiativeMarkerPosition(token) {
    const gridSize = canvas?.grid?.size ?? 100;
    const markerSize = gridSize * CONCEALED_MARKER_SIZE;
    const gap = gridSize * CONCEALED_MARKER_GAP;
    const tokenWidth = (Number(token?.width) || 1) * gridSize;
    const tokenHeight = (Number(token?.height) || 1) * gridSize;
    const tokenX = Number(token?.x);
    const tokenY = Number(token?.y);

    if (!Number.isFinite(tokenX) || !Number.isFinite(tokenY)) {
        throw new Error("Unable to determine the character's position for the Missed Initiative marker.");
    }

    return {
        x: tokenX + tokenWidth + gap,
        y: tokenY + tokenHeight + gap,
        width: markerSize,
        height: markerSize,
        elevation: (Number(token?.elevation) || 0) + 0.01
    };
}

function getStoredMissedInitiativeMarker(tokenUuid, scene = canvas?.scene) {
    if (!scene) return null;
    return scene.tiles?.find(tile =>
        tile.getFlag(MODULE_ID, MISSED_INITIATIVE_MARKER_FLAG)?.tokenUuid === tokenUuid
    ) ?? null;
}

async function createOrUpdateMissedInitiativeMarker(tokenDocument, failureCount, scene = canvas?.scene) {
    if (!tokenDocument || !scene || failureCount <= 0) return null;

    const position = getMissedInitiativeMarkerPosition(tokenDocument);
    const image = getMissedInitiativeImage(failureCount);
    const bonus = getMissedInitiativeBonus(failureCount);
    const existing = getStoredMissedInitiativeMarker(tokenDocument.uuid, scene);

    const tileData = {
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,
        texture: { src: image },
        locked: true,
        elevation: position.elevation,
        flags: {
            [MODULE_ID]: {
                [MISSED_INITIATIVE_MARKER_FLAG]: {
                    tokenUuid: tokenDocument.uuid,
                    sceneId: scene.id,
                    consecutiveFailures: failureCount,
                    bonus,
                    updatedAt: Date.now()
                }
            }
        }
    };

    if (existing) {
        await existing.update(tileData);
        return existing;
    }

    const created = await scene.createEmbeddedDocuments("Tile", [tileData]);
    return created?.[0] ?? null;
}

async function removeMissedInitiativeMarker(tokenUuid, scene = canvas?.scene) {
    const marker = getStoredMissedInitiativeMarker(tokenUuid, scene);
    if (!marker || !scene) return;
    await scene.deleteEmbeddedDocuments("Tile", [marker.id]);
}

async function updateMissedInitiativeMarkerPosition(token) {
    const tokenDocument = token?.document ?? token;
    if (!tokenDocument?.uuid) return;
    const scene = tokenDocument.parent ?? canvas?.scene;
    if (!scene) return;
    const marker = getStoredMissedInitiativeMarker(tokenDocument.uuid, scene);
    if (!marker) return;
    const position = getMissedInitiativeMarkerPosition(tokenDocument);
    await marker.update({
        x: position.x, y: position.y,
        width: position.width, height: position.height,
        elevation: position.elevation
    });
}

function clearMissedInitiativeTracking() {
    missedInitiativeStates.clear();
}

function recordMissedInitiativeFailure(tokenUuid) {
    const next = getMissedInitiativeFailureCount(tokenUuid) + 1;
    missedInitiativeStates.set(tokenUuid, next);
    return next;
}

function resetMissedInitiativeFailure(tokenUuid) {
    missedInitiativeStates.delete(tokenUuid);
}

async function removeAllMissedInitiativeMarkers(
    scene = canvas?.scene
) {

    if (!scene) {
        return 0;
    }

    const markerIds =
        scene.tiles?.filter(
            tile =>
                Boolean(
                    tile.getFlag(
                        MODULE_ID,
                        MISSED_INITIATIVE_MARKER_FLAG
                    )
                )
        )
        .map(tile => tile.id) ?? [];

    if (markerIds.length === 0) {
        return 0;
    }

    await scene.deleteEmbeddedDocuments(
        "Tile",
        markerIds
    );

    return markerIds.length;
}


/* ============================================================
 * CONCEALED MARKER
 * ============================================================ */

function getConcealedMarkerPosition(token) {

    const gridSize =
        canvas?.grid?.size ?? 100;

    const markerSize =
        gridSize * CONCEALED_MARKER_SIZE;

    const gap =
        gridSize * CONCEALED_MARKER_GAP;

    /*
     * TokenDocument.x/y are already pixel coordinates.
     *
     * TokenDocument.width/height are measured in grid units,
     * so convert them to pixels before positioning the marker.
     */
    const tokenWidth =
        (Number(token?.width) || 1) * gridSize;

    const tokenHeight =
        (Number(token?.height) || 1) * gridSize;

    const tokenX =
        Number(token?.x);

    const tokenY =
        Number(token?.y);

    if (
        !Number.isFinite(tokenX) ||
        !Number.isFinite(tokenY)
    ) {

        throw new Error(
            "Unable to determine the selected token's position."
        );
    }

    return {

        /*
         * Upper-right corner of the token.
         */
        x:
            tokenX +
            tokenWidth +
            gap,

        y:
            tokenY -
            markerSize -
            gap,

        width:
            markerSize,

        height:
            markerSize,

        /*
         * The marker is a Tile, while the character is a Token.
         * Foundry sorts the Primary Canvas Group by elevation before
         * its normal layer ordering. Give the marker a tiny elevation
         * offset above the character so it remains visible even when
         * the character moves underneath it.
         *
         * The offset is intentionally very small so the marker remains
         * on the same practical elevation/level as the character.
         */
        elevation:
            (Number(token?.elevation) || 0) +
            0.01
    };
}


async function getStoredConcealedActionMarker(
    tokenUuid,
    scene = canvas?.scene
) {

    if (!scene) {
        return null;
    }

    return scene.tiles?.find(
        tile =>
            tile.getFlag(
                MODULE_ID,
                CONCEALED_MARKER_FLAG
            )?.tokenUuid === tokenUuid
    ) ?? null;
}


async function getConcealedActionMarker(
    tokenUuid,
    scene = canvas?.scene
) {

    return getStoredConcealedActionMarker(
        tokenUuid,
        scene
    );
}


async function createOrUpdateConcealedActionMarker(
    tokenDocument,
    scene = canvas?.scene
) {

    if (
        !tokenDocument ||
        !scene
    ) {
        return null;
    }

    const position =
        getConcealedMarkerPosition(
            tokenDocument
        );

    const existing =
        await getStoredConcealedActionMarker(
            tokenDocument.uuid,
            scene
        );

    const tileData = {

        x: position.x,

        y: position.y,

        width: position.width,

        height: position.height,

        texture: {
            src:
                CONCEALED_MARKER_IMAGE
        },

        locked: true,

        /*
         * Keep the marker just above the character's elevation so
         * the Action Option remains visible if the two overlap.
         */
        elevation:
            position.elevation,

        flags: {
            [MODULE_ID]: {
                [CONCEALED_MARKER_FLAG]: {
                    tokenUuid:
                        tokenDocument.uuid,

                    sceneId:
                        scene.id,

                    createdAt:
                        Date.now()
                }
            }
        }
    };

    if (existing) {

        await existing.update(
            tileData
        );

        return existing;
    }

    const created =
        await scene.createEmbeddedDocuments(
            "Tile",
            [tileData]
        );

    return created?.[0] ?? null;
}


async function removeConcealedActionMarker(
    tokenUuid,
    scene = canvas?.scene
) {

    const marker =
        await getStoredConcealedActionMarker(
            tokenUuid,
            scene
        );

    if (!marker) {
        return;
    }

    await scene.deleteEmbeddedDocuments(
        "Tile",
        [marker.id]
    );
}


/*
 * Remove every concealed Action Option marker from a Scene.
 *
 * These markers are Scene Tiles created by this module. This function
 * deliberately removes ONLY tiles carrying this module's concealed
 * Action Option flag; it does not remove character Tokens or any other
 * Scene Tiles.
 */
async function removeAllConcealedActionMarkers(
    scene = canvas?.scene
) {

    if (!scene) {
        return 0;
    }

    const markerIds =
        scene.tiles?.filter(
            tile =>
                Boolean(
                    tile.getFlag(
                        MODULE_ID,
                        CONCEALED_MARKER_FLAG
                    )
                )
        )
        .map(tile => tile.id) ?? [];

    if (markerIds.length === 0) {
        return 0;
    }

    await scene.deleteEmbeddedDocuments(
        "Tile",
        markerIds
    );

    return markerIds.length;
}


async function updateConcealedActionMarkerPosition(
    token
) {

    /*
     * Foundry's updateToken hook supplies a TokenDocument, while
     * some other callers may supply a rendered Token. Normalize
     * both forms here so the marker always follows the character.
     */
    const tokenDocument =
        token?.document ??
        token;

    if (!tokenDocument?.uuid) {
        return;
    }

    const scene =
        tokenDocument.parent ??
        canvas?.scene;

    if (!scene) {
        return;
    }

    const marker =
        await getStoredConcealedActionMarker(
            tokenDocument.uuid,
            scene
        );

    if (!marker) {
        return;
    }

    const position =
        getConcealedMarkerPosition(
            tokenDocument
        );

    await marker.update({
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,
        elevation: position.elevation
    });
}


/* ============================================================
 * GM SOCKET HANDLER
 * ============================================================
 *
 * IMPORTANT:
 *
 * A GM submitting an Action Option does NOT use the socket to
 * receive its own response.
 *
 * The GM calls this function directly and supplies localResponse.
 *
 * A non-GM sends the request through game.socket, and the GM
 * sends the response back through game.socket.
 * ============================================================ */

function handleActionOptionSocket(
    data,
    localResponse = null
) {

    if (!data) {
        return;
    }

    if (
        data.type !==
        "submit-action-option"
    ) {
        return;
    }

    /*
     * Only the GM processes submissions.
     */
    if (!game?.user?.isGM) {
        return;
    }

    void (async () => {

        let success = false;

        let message =
            "The Action Option could not be recorded.";

        try {

            const requester =
                game.users?.get(
                    data.userId
                );

            if (
                !requester ||
                !requester.active
            ) {
                message =
                    "The requesting player is no longer active.";
            }

            else if (
                !data.actorUuid
            ) {
                message =
                    "No character was supplied.";
            }

            else {

                const actor =
                    await fromUuid(
                        data.actorUuid
                    );

                if (!actor) {

                    message =
                        "The selected character could not be found.";
                }

                else if (
                    !actor.testUserPermission(
                        requester,
                        "LIMITED"
                    )
                ) {

                    message =
                        "The requesting player does not have permission to choose an Action Option for this character.";
                }

                else {

                    const selection =
                        normalizeActionSelection(
                            data.selection
                        );

                    const validation =
                        validateActionSelection(
                            selection
                        );

                    if (!validation.valid) {

                        message =
                            validation.reason;
                    }

                    else {

                        /*
                         * Store the actual selection only in the
                         * GM's memory.
                         */
                        hiddenActionSelections.set(
                            actor.uuid,
                            {
                                actorUuid:
                                    actor.uuid,

                                actorName:
                                    actor.name,

                                tokenUuid:
                                    data.tokenUuid ??
                                    null,

                                sceneId:
                                    data.sceneId ??
                                    null,

                                playerId:
                                    requester.id,

                                playerName:
                                    requester.name,

                                selection,

                                selectedAt:
                                    Date.now()
                            }
                        );

                        /*
                         * Create/update the concealed marker.
                         */
                        if (
                            data.tokenUuid &&
                            data.sceneId ===
                            canvas.scene?.id
                        ) {

                            const tokenDocument =
                                await fromUuid(
                                    data.tokenUuid
                                );

                            if (
                                tokenDocument
                            ) {

                                await createOrUpdateConcealedActionMarker(
                                    tokenDocument,
                                    canvas.scene
                                );
                            }
                        }

                        /*
                         * Public announcement.
                         *
                         * The actual Action Option is NOT revealed
                         * when the player makes the selection.
                         */
                        await ChatMessage.create({
                            content:
                                `${escapeChatHTML(requester.name)} has chosen an Action Option for ${escapeChatHTML(actor.name)}.`
                        });

                        success = true;

                        message =
                            `Action Option selected for ${actor.name}.`;
                    }
                }
            }

        }

        catch (error) {

            console.error(
                `${MODULE_ID} | Action Option request failed`,
                error
            );

            message =
                error?.message ??
                "An error occurred while recording the Action Option.";
        }

        const response = {

            type:
                "action-option-result",

            requestId:
                data.requestId,

            userId:
                data.userId,

            success,

            message
        };

        /*
         * THIS IS THE FIX.
         *
         * If the requester is the GM, return the response directly
         * to the waiting Promise.
         *
         * If the requester is a player, send the response through
         * the Foundry socket to that player.
         */
        if (
            typeof localResponse ===
            "function"
        ) {

            localResponse(
                response
            );
        }

        else {

            game.socket.emit(
                SOCKET_NAME,
                response
            );
        }

    })();
}


/* ============================================================
 * SOCKET INITIALIZATION
 * ============================================================ */

function initializeActionOptionSocket() {

    game.socket.on(
        SOCKET_NAME,
        data => {

            if (
                data?.type ===
                "submit-action-option"
            ) {

                handleActionOptionSocket(
                    data
                );
            }
        }
    );
}


/* ============================================================
 * SUBMIT ACTION OPTION
 * ============================================================
 *
 * GM:
 *     Directly invokes handleActionOptionSocket()
 *
 * Player:
 *     Sends request through game.socket
 * ============================================================ */

function submitActionOptionSelection({
    actor,
    token,
    selection
}) {

    return new Promise(
        resolve => {

            const validation =
                validateActionSelection(
                    selection
                );

            if (!validation.valid) {

                resolve({
                    success: false,
                    message:
                        validation.reason
                });

                return;
            }

            const activeGM =
                game.users?.find(
                    user =>
                        user.isGM &&
                        user.active
                );

            if (!activeGM) {

                resolve({
                    success: false,
                    message:
                        "No active GM is available to record the Action Option."
                });

                return;
            }

            const requestId =
                foundry.utils.randomID();

            let settled = false;

            /*
             * Only non-GM clients need a socket response listener.
             */
            const responseHandler =
                data => {

                    if (!data) {
                        return;
                    }

                    if (
                        data.type !==
                        "action-option-result"
                    ) {
                        return;
                    }

                    if (
                        data.requestId !==
                        requestId
                    ) {
                        return;
                    }

                    if (
                        data.userId !==
                        game.user.id
                    ) {
                        return;
                    }

                    if (settled) {
                        return;
                    }

                    settled = true;

                    game.socket.off(
                        SOCKET_NAME,
                        responseHandler
                    );

                    resolve({
                        success:
                            Boolean(
                                data.success
                            ),

                        message:
                            data.message
                    });
                };

            const request = {

                type:
                    "submit-action-option",

                requestId,

                userId:
                    game.user.id,

                actorUuid:
                    actor.uuid,

                tokenUuid:
                    token?.document?.uuid ??
                    null,

                sceneId:
                    canvas.scene?.id ??
                    null,

                selection:
                    normalizeActionSelection(
                        selection
                    )
            };

            if (game.user.isGM) {

                /*
                 * GM FIX:
                 *
                 * Do NOT use game.socket.emit().
                 *
                 * Process the request locally and pass the
                 * response directly to responseHandler().
                 */
                handleActionOptionSocket(
                    request,
                    response => {

                        if (settled) {
                            return;
                        }

                        settled = true;

                        resolve({
                            success:
                                Boolean(
                                    response.success
                                ),

                            message:
                                response.message
                        });
                    }
                );

            }

            else {

                /*
                 * Player sends the request to the GM.
                 */
                game.socket.emit(
                    SOCKET_NAME,
                    request
                );

                /*
                 * Listen for the GM's response.
                 */
                game.socket.on(
                    SOCKET_NAME,
                    responseHandler
                );

                /*
                 * Timeout only applies to the player/socket path.
                 */
                setTimeout(
                    () => {

                        if (settled) {
                            return;
                        }

                        settled = true;

                        game.socket.off(
                            SOCKET_NAME,
                            responseHandler
                        );

                        resolve({
                            success: false,
                            message:
                                "The GM did not respond to the Action Option request."
                        });

                    },
                    10000
                );
            }
        }
    );
}


/* ============================================================
 * STORED ACTION OPTION ACCESS
 * ============================================================ */

function getStoredActionSelection(
    actorUuid
) {

    /*
     * Only the GM can retrieve the concealed selection.
     */
    if (
        !game?.user?.isGM
    ) {
        return null;
    }

    const stored =
        hiddenActionSelections.get(
            actorUuid
        );

    if (!stored) {
        return null;
    }

    return foundry.utils.deepClone(
        stored
    );
}


function clearStoredActionSelection(
    actorUuid
) {

    if (
        !game?.user?.isGM
    ) {
        return false;
    }

    return hiddenActionSelections.delete(
        actorUuid
    );
}


/* ============================================================
 * COMBAT / INITIATIVE TURN PROCESSING
 * ============================================================ */

/*
 * Find the TokenDocument associated with a Combatant.
 */
async function getCombatantTokenDocument(
    combatant
) {

    if (!combatant) {
        return null;
    }

    /*
     * Normal case: Combatant.token is a TokenDocument.
     */
    if (
        combatant.token
    ) {
        return combatant.token;
    }

    /*
     * Try the stored token UUID.
     */
    if (
        combatant.tokenId &&
        combatant.parent?.scene
    ) {

        const token =
            combatant.parent.scene.tokens?.get(
                combatant.tokenId
            );

        if (token) {
            return token;
        }
    }

    /*
     * Try the current canvas.
     */
    if (
        combatant.tokenId &&
        canvas?.tokens
    ) {

        const token =
            canvas.tokens.get(
                combatant.tokenId
            );

        if (token?.document) {
            return token.document;
        }
    }

    return null;
}


/*
 * Get the Action Option name(s) that were stored for this actor.
 */
function getActionOptionDisplayText(
    actorUuid
) {

    const stored =
        getStoredActionSelection(
            actorUuid
        );

    if (!stored?.selection) {
        return "None";
    }

    const optionNames =
        stored.selection.options
            .map(
                id =>
                    getActionOption(id)?.name ??
                    id
            );

    const adjustmentNames =
        stored.selection.adjustments
            .map(
                id =>
                    getActionAdjustment(id)?.name ??
                    id
            );

    const names = [
        ...optionNames,
        ...adjustmentNames
    ];

    if (names.length === 0) {
        return "None";
    }

    return names.join(" + ");
}


/* ============================================================
 * CHOOSE ACTION OPTIONS COMBATANT
 * ============================================================
 *
 * The module uses a special hidden combatant named
 * "Choose Action Options" as the first entry in every combat.
 *
 * The Actor is created only if it does not already exist. If the
 * user already has an Actor with that name, the module reuses it.
 *
 * The Initiative Item is cloned from an existing HarnMaster Actor
 * rather than constructing the HarnMaster Item schema ourselves.
 * This preserves the exact skill structure used by the installed
 * HarnMaster system version.
 */

function isChooseActionOptionsActor(actor) {

    if (!actor) {
        return false;
    }

    if (
        actor.getFlag?.(
            MODULE_ID,
            CHOOSE_ACTION_OPTIONS_ACTOR_FLAG
        ) === true
    ) {
        return true;
    }

    return (
        actor.name?.trim() ===
        CHOOSE_ACTION_OPTIONS_ACTOR_NAME
    );
}


function findInitiativeSkill(actor) {

    return actor?.items?.find(
        item =>
            item.type === "skill" &&
            item.name?.trim().toLowerCase() ===
            "initiative"
    ) ?? null;
}


function findChooseActionOptionsActor() {

    if (!game?.actors) {
        return null;
    }

    /* Prefer an Actor explicitly marked by this module. */
    const flaggedActor =
        game.actors.find(
            actor =>
                actor.getFlag?.(
                    MODULE_ID,
                    CHOOSE_ACTION_OPTIONS_ACTOR_FLAG
                ) === true
        );

    if (flaggedActor) {
        return flaggedActor;
    }

    /* Preserve compatibility with the user's existing Actor. */
    return game.actors.find(
        actor =>
            actor.name?.trim() ===
            CHOOSE_ACTION_OPTIONS_ACTOR_NAME
    ) ?? null;
}


function findInitiativeTemplate() {

    if (!game?.actors) {
        return null;
    }

    for (const actor of game.actors) {

        if (
            isChooseActionOptionsActor(actor)
        ) {
            continue;
        }

        const initiative =
            findInitiativeSkill(actor);

        if (initiative) {
            return {
                actor,
                initiative
            };
        }
    }

    return null;
}


async function createChooseActionOptionsActor() {

    let actor =
        findChooseActionOptionsActor();

    if (actor) {

        if (
            actor.getFlag?.(
                MODULE_ID,
                CHOOSE_ACTION_OPTIONS_ACTOR_FLAG
            ) !== true
        ) {
            await actor.setFlag(
                MODULE_ID,
                CHOOSE_ACTION_OPTIONS_ACTOR_FLAG,
                true
            );
        }

        return actor;
    }

    const template =
        findInitiativeTemplate();

    if (!template) {
        throw new Error(
            "Unable to create the Choose Action Options Actor because no existing HarnMaster Actor with an Initiative skill could be found."
        );
    }

    /*
     * Create a normal HarnMaster Actor so the system supplies all
     * required default Actor data for the installed system version.
     */
    actor = await Actor.create({
        name:
            CHOOSE_ACTION_OPTIONS_ACTOR_NAME,

        type:
            template.actor.type,

        img:
            template.actor.img,

        flags: {
            [MODULE_ID]: {
                [CHOOSE_ACTION_OPTIONS_ACTOR_FLAG]: true
            }
        }
    });

    if (!actor) {
        throw new Error(
            "Foundry did not return the newly created Choose Action Options Actor."
        );
    }

    /*
     * Clone the complete Initiative Item from the existing Actor.
     * Remove document identity/metadata so Foundry creates a fresh
     * embedded Item owned by the new Actor.
     */
    const initiativeData =
        foundry.utils.deepClone(
            template.initiative.toObject()
        );

    delete initiativeData._id;
    delete initiativeData._stats;

    initiativeData.name = "Initiative";

    if (!initiativeData.system) {
        initiativeData.system = {};
    }

    /*
     * Only the Mastery Level is overridden. HarnMaster remains
     * responsible for preparing Effective Mastery Level normally.
     */
    initiativeData.system.masteryLevel =
        String(CHOOSE_ACTION_OPTIONS_INITIATIVE);

    await actor.createEmbeddedDocuments(
        "Item",
        [initiativeData]
    );

    actor.prepareData();

    console.log(
        `${MODULE_ID} | Created "${CHOOSE_ACTION_OPTIONS_ACTOR_NAME}" Actor with Initiative ML ${CHOOSE_ACTION_OPTIONS_INITIATIVE}.`,
        actor
    );

    return actor;
}


async function ensureChooseActionOptionsCombatant(
    combat
) {

    if (
        !game?.user?.isGM ||
        !combat
    ) {
        return null;
    }

    if (chooseActionOptionsSetupPromise) {
        return chooseActionOptionsSetupPromise;
    }

    chooseActionOptionsSetupPromise = (async () => {

        const actor =
            await createChooseActionOptionsActor();

        const scene =
            combat.scene ??
            canvas?.scene;

        if (!scene) {
            throw new Error(
                "The active combat has no associated Scene."
            );
        }

        /*
         * Find an existing Token for this Actor on the combat Scene.
         * This allows the user's existing manually-created Token to
         * continue working without creating a duplicate.
         */
        let tokenDocument =
            scene.tokens?.find(
                token =>
                    token.actorId === actor.id
            ) ?? null;

        if (!tokenDocument) {

            const tokenData =
                await actor.getTokenDocument({
                    x: 0,
                    y: 0,
                    hidden: true,
                    actorLink: true
                });

            const rawTokenData =
                tokenData.toObject();

            rawTokenData.x = 0;
            rawTokenData.y = 0;
            rawTokenData.hidden = true;
            rawTokenData.actorLink = true;
            rawTokenData.name =
                CHOOSE_ACTION_OPTIONS_ACTOR_NAME;

            rawTokenData.flags =
                foundry.utils.mergeObject(
                    rawTokenData.flags ?? {},
                    {
                        [MODULE_ID]: {
                            [CHOOSE_ACTION_OPTIONS_ACTOR_FLAG]: true
                        }
                    }
                );

            const createdTokens =
                await scene.createEmbeddedDocuments(
                    "Token",
                    [rawTokenData]
                );

            tokenDocument =
                createdTokens?.[0] ?? null;
        }

        if (!tokenDocument) {
            throw new Error(
                "Unable to create or locate the Choose Action Options Token."
            );
        }

        /*
         * Make sure this Token is a Combatant in the current Combat.
         */
        let combatant =
            combat.combatants?.find(
                entry =>
                    entry.tokenId ===
                    tokenDocument.id
            ) ?? null;

        if (!combatant) {

            const createdCombatants =
                await foundry.documents.TokenDocument.createCombatants(
                    [tokenDocument],
                    { combat }
                );

            combatant =
                createdCombatants?.find(
                    entry =>
                        entry.tokenId ===
                        tokenDocument.id
                ) ??
                combat.combatants?.find(
                    entry =>
                        entry.tokenId ===
                        tokenDocument.id
                ) ??
                null;
        }

        if (!combatant) {
            throw new Error(
                "Unable to create the Choose Action Options Combatant."
            );
        }

        /*
         * Always force the control combatant to Initiative 1000.
         * This is intentionally a Combatant initiative value, not
         * the HarnMaster skill ML. The skill remains at ML 1000 as
         * well, preserving the user's original setup.
         */
        if (
            Number(combatant.initiative) !==
            CHOOSE_ACTION_OPTIONS_INITIATIVE
        ) {
            await combatant.update({
                initiative:
                    CHOOSE_ACTION_OPTIONS_INITIATIVE
            });
        }

        console.log(
            `${MODULE_ID} | Choose Action Options combatant is ready.`,
            {
                actor: actor.name,
                actorUuid: actor.uuid,
                tokenUuid: tokenDocument.uuid,
                combatId: combat.id,
                initiative:
                    CHOOSE_ACTION_OPTIONS_INITIATIVE
            }
        );

        return {
            actor,
            tokenDocument,
            combatant
        };

    })();

    try {
        return await chooseActionOptionsSetupPromise;
    }
    finally {
        chooseActionOptionsSetupPromise = null;
    }
}




/* ============================================================
 * REVEALED ACTION OPTION TOKEN
 * ============================================================ */

function getRevealedActionOptionImage(actionOptionId) {

    if (!actionOptionId) {
        return null;
    }

    return `${REVEALED_ACTION_OPTION_IMAGE_ROOT}/${actionOptionId}.webp`;
}


/*
 * Convert an Action Option adjustment ID into the filename used by
 * the shared Attack Option graphics.
 *
 * Mounted/Rider/Charge-specific adjustment IDs all use the same
 * Attack Option artwork.
 */
function getAttackOptionGraphicId(adjustmentId) {

    if (!adjustmentId) {
        return null;
    }

    const aliases = {
        "rider-two-weapon-fighting": "two-weapon-fighting",
        "rider-disarm": "disarm",
        "rider-guarded-attack": "guarded-attack",
        "rider-feint": "feint",
        "rider-strike-to-stun": "strike-to-stun",
        "rider-all-out-attack": "all-out-attack",
        "rider-mighty-strike": "mighty-strike",
        "rider-called-strike": "called-strike",

        "charge-two-weapon-fighting": "two-weapon-fighting",
        "charge-strike-to-stun": "strike-to-stun",
        "charge-all-out-attack": "all-out-attack",
        "charge-mighty-strike": "mighty-strike"
    };

    return aliases[adjustmentId] ?? adjustmentId;
}


/*
 * Return every revealed Action Option Tile belonging to a character.
 */
async function getStoredRevealedActionOptionTokens(
    tokenUuid,
    scene = canvas?.scene
) {

    if (!scene || !tokenUuid) {
        return [];
    }

    return scene.tiles?.filter(
        tile => {
            const flag =
                tile.getFlag(
                    MODULE_ID,
                    REVEALED_ACTION_OPTION_FLAG
                );

            return (
                flag?.tokenUuid === tokenUuid
            );
        }
    ) ?? [];
}


/*
 * Backwards-compatible singular lookup.  Some older code paths may
 * still call this helper, so return the first matching Tile.
 */
async function getStoredRevealedActionOptionToken(
    tokenUuid,
    scene = canvas?.scene
) {

    const tokens =
        await getStoredRevealedActionOptionTokens(
            tokenUuid,
            scene
        );

    return tokens[0] ?? null;
}


/*
 * Remove every revealed Action Option Tile belonging to one character.
 */
async function removeRevealedActionOptionToken(
    tokenUuid,
    scene = canvas?.scene
) {

    const tokens =
        await getStoredRevealedActionOptionTokens(
            tokenUuid,
            scene
        );

    if (
        tokens.length === 0 ||
        !scene
    ) {
        return 0;
    }

    await scene.deleteEmbeddedDocuments(
        "Tile",
        tokens.map(
            tile => tile.id
        )
    );

    return tokens.length;
}


async function removeAllRevealedActionOptionTokens(
    scene = canvas?.scene
) {

    if (!scene) {
        return 0;
    }

    const tokenIds =
        scene.tiles?.filter(
            tile =>
                Boolean(
                    tile.getFlag(
                        MODULE_ID,
                        REVEALED_ACTION_OPTION_FLAG
                    )
                )
        )
        .map(
            tile => tile.id
        ) ?? [];

    if (tokenIds.length === 0) {
        return 0;
    }

    await scene.deleteEmbeddedDocuments(
        "Tile",
        tokenIds
    );

    return tokenIds.length;
}


/*
 * Create one revealed graphic for EVERY selected Action Option and
 * Attack Option.
 *
 * Examples:
 *
 *   Melee Attack + Two-Weapon-Fighting + Feint
 *       -> 3 separate graphics
 *
 *   Charge + Shield Bash + Mighty Strike
 *       -> 3 separate graphics
 *
 * The first graphic occupies the same position previously used by
 * the concealed question mark. Additional graphics are placed
 * immediately to its right so they remain individually visible and
 * hoverable.
 */
async function createRevealedActionOptionToken(
    tokenDocument,
    selection,
    scene = canvas?.scene
) {

    if (
        !tokenDocument ||
        !scene ||
        !selection
    ) {
        return [];
    }

    const optionIds =
        Array.isArray(selection.options)
            ? selection.options
            : [];

    const adjustmentIds =
        Array.isArray(selection.adjustments)
            ? selection.adjustments
            : [];

    /*
     * Build the complete ordered graphic list.
     *
     * Primary Action Options use their own graphic IDs.
     * Attack Option adjustments use the shared Attack Option artwork.
     */
    const graphics = [];

    for (const actionOptionId of optionIds) {

        const image =
            getRevealedActionOptionImage(
                actionOptionId
            );

        if (!image) {
            continue;
        }

        graphics.push({
            graphicId: actionOptionId,
            sourceId: actionOptionId,
            type: "action-option",
            image
        });
    }

    for (const adjustmentId of adjustmentIds) {

        const graphicId =
            getAttackOptionGraphicId(
                adjustmentId
            );

        const image =
            getRevealedActionOptionImage(
                graphicId
            );

        if (!image) {
            continue;
        }

        graphics.push({
            graphicId,
            sourceId: adjustmentId,
            type: "attack-option",
            image
        });
    }

    if (graphics.length === 0) {
        return [];
    }

    /*
     * Remove any previous revealed graphics for this character first.
     * This prevents duplicates if the reveal function is called again.
     */
    await removeRevealedActionOptionToken(
        tokenDocument.uuid,
        scene
    );

    const position =
        getConcealedMarkerPosition(
            tokenDocument
        );

    /*
     * Place the entire row directly above the actor and center it
     * horizontally on the actor's center.
     *
     * For three graphics:
     *
     *       [ Action ] [ Attack ] [ Attack ]
     *                 ACTOR
     *
     * The same calculation also keeps one- and two-graphic rows
     * centered over the actor.
     */
    const gridSize =
        canvas?.grid?.size ?? 100;

    const gap =
        gridSize *
        CONCEALED_MARKER_GAP;

    const step =
        position.width +
        gap;

    const totalRowWidth =
        (
            graphics.length *
            position.width
        ) +
        (
            Math.max(
                graphics.length - 1,
                0
            ) *
            gap
        );

    const tokenWidth =
        (Number(tokenDocument.width) || 1) *
        gridSize;

    const tokenX =
        Number(tokenDocument.x);

    const tokenCenterX =
        tokenX +
        (tokenWidth / 2);

    const rowStartX =
        tokenCenterX -
        (totalRowWidth / 2);

    const tileData = graphics.map(
        (graphic, index) => ({
            x:
                rowStartX +
                (step * index),

            y:
                position.y,

            width:
                position.width,

            height:
                position.height,

            texture: {
                src: graphic.image
            },

            locked: true,

            elevation:
                position.elevation,

            flags: {
                [MODULE_ID]: {
                    [REVEALED_ACTION_OPTION_FLAG]: {
                        tokenUuid:
                            tokenDocument.uuid,

                        sceneId:
                            scene.id,

                        actionOptionId:
                            graphic.graphicId,

                        sourceId:
                            graphic.sourceId,

                        selectionType:
                            graphic.type,

                        revealedAt:
                            Date.now()
                    }
                }
            }
        })
    );

    return await scene.createEmbeddedDocuments(
        "Tile",
        tileData
    );
}


async function updateRevealedActionOptionTokenPosition(
    token
) {

    /*
     * Foundry's updateToken hook supplies a TokenDocument, while
     * some other callers may supply a rendered Token. Normalize
     * both forms here so every revealed graphic follows the character.
     */
    const tokenDocument =
        token?.document ??
        token;

    if (!tokenDocument?.uuid) {
        return;
    }

    const scene =
        tokenDocument.parent ??
        canvas?.scene;

    if (!scene) {
        return;
    }

    const revealedTokens =
        await getStoredRevealedActionOptionTokens(
            tokenDocument.uuid,
            scene
        );

    if (revealedTokens.length === 0) {
        return;
    }

    const position =
        getConcealedMarkerPosition(
            tokenDocument
        );

    /*
     * Recalculate the centered row position every time the actor
     * moves or changes size.
     */
    const gridSize =
        canvas?.grid?.size ?? 100;

    const gap =
        gridSize *
        CONCEALED_MARKER_GAP;

    const step =
        position.width +
        gap;

    const totalRowWidth =
        (
            revealedTokens.length *
            position.width
        ) +
        (
            Math.max(
                revealedTokens.length - 1,
                0
            ) *
            gap
        );

    const tokenWidth =
        (Number(tokenDocument.width) || 1) *
        gridSize;

    const tokenX =
        Number(tokenDocument.x);

    const tokenCenterX =
        tokenX +
        (tokenWidth / 2);

    const rowStartX =
        tokenCenterX -
        (totalRowWidth / 2);

    const updates =
        revealedTokens.map(
            (revealed, index) =>
                revealed.update({
                    x:
                        rowStartX +
                        (step * index),

                    y:
                        position.y,

                    width:
                        position.width,

                    height:
                        position.height,

                    elevation:
                        position.elevation
                })
        );

    await Promise.all(
        updates
    );
}


/*
 * Process the active combatant's turn.
 *
 * This is deliberately GM-only.
 *
 * The Action Option is revealed in the chat message regardless
 * of whether the Initiative EML test succeeds or fails.
 *
 * This function does NOT prevent the character from acting.
 */
async function processActionOptionTurn(
    combat
) {
    if (!game?.user?.isGM || !combat?.started) return;

    const combatant = combat.combatant;
    if (!combatant) return;

    const tokenDocument = await getCombatantTokenDocument(combatant);
    const actor = combatant.actor ?? tokenDocument?.actor;
    if (!actor) return;

    /* The control combatant begins each round. Missed Initiative streaks
     * intentionally survive the round boundary until an Initiative test succeeds. */
    if (isChooseActionOptionsActor(actor)) {
        try {
            const clearedSelectionCount = hiddenActionSelections.size;
            hiddenActionSelections.clear();
            const removedConcealedCount = await removeAllConcealedActionMarkers(canvas?.scene);
            const removedRevealedCount = await removeAllRevealedActionOptionTokens(canvas?.scene);
            console.log(`${MODULE_ID} | Choose Action Options turn: reset ${clearedSelectionCount} character selection(s), cleared ${removedConcealedCount} concealed marker(s), and ${removedRevealedCount} revealed Action Option token(s).`);
        } catch (error) {
            console.error(`${MODULE_ID} | Could not clear Action Option markers at the beginning of the round`, error);
        }
        previousActionOptionTurnTokenUuid = null;
        return;
    }

    const turnKey = [combat.id, Number(combat.round ?? 0), Number(combat.turn ?? 0), combatant.id].join(":");
    if (processedCombatTurns.has(turnKey)) return;
    processedCombatTurns.add(turnKey);

    /* Remove the previous character's revealed Action Option marker. */
    if (previousActionOptionTurnTokenUuid && previousActionOptionTurnTokenUuid !== tokenDocument?.uuid && canvas?.scene) {
        try {
            await removeRevealedActionOptionToken(previousActionOptionTurnTokenUuid, canvas.scene);
        } catch (error) {
            console.error(`${MODULE_ID} | Could not remove previous revealed Action Option token`, error);
        }
    }

    /* Never reveal the current Action Option until Initiative succeeds. */
    if (tokenDocument && canvas?.scene) {
        try {
            await removeRevealedActionOptionToken(tokenDocument.uuid, canvas.scene);
        } catch (error) {
            console.error(`${MODULE_ID} | Could not clear current revealed Action Option token before Initiative test`, error);
        }
    }

    previousActionOptionTurnTokenUuid = tokenDocument?.uuid ?? null;

    const initiativeItem = actor.items?.find(item =>
        item.type === "skill" && item.name?.trim().toLowerCase() === "initiative"
    );

    if (!initiativeItem) {
        console.warn(`${MODULE_ID} | No Initiative skill found for ${actor.name}.`);
        await ChatMessage.create({
            content: `<div class="hm-action-turn-result"><h3>${escapeChatHTML(actor.name)}'s Turn</h3><p>The character's Initiative skill could not be found.</p></div>`
        });
        return;
    }

    const baseInitiativeEML = Number(initiativeItem.system?.effectiveMasteryLevel);
    if (!Number.isFinite(baseInitiativeEML)) {
        console.error(`${MODULE_ID} | Invalid Initiative EML for ${actor.name}:`, initiativeItem.system?.effectiveMasteryLevel);
        await ChatMessage.create({
            content: `<div class="hm-action-turn-result"><h3>${escapeChatHTML(actor.name)}'s Turn</h3><p>The character's Initiative EML could not be determined.</p></div>`
        });
        return;
    }

    const tokenUuid = tokenDocument?.uuid ?? `${actor.uuid}:${combatant.id}`;
    const previousFailures = getMissedInitiativeFailureCount(tokenUuid);
    const missedInitiativeBonus = getMissedInitiativeBonus(previousFailures);
    const initiativeEML = baseInitiativeEML + missedInitiativeBonus;

    let result;
    try {
        const Dice = await getDiceHM3();
        result = await Dice.rollTest({
            type: "Initiative",
            diceSides: 100,
            diceNum: 1,
            modifier: 0,
            target: initiativeEML
        });
    } catch (error) {
        console.error(`${MODULE_ID} | Initiative EML test failed`, error);
        await ChatMessage.create({
            content: `<div class="hm-action-turn-result"><h3>${escapeChatHTML(actor.name)}'s Turn</h3><p>Unable to perform the Initiative EML test.</p></div>`
        });
        return;
    }

    const success = Boolean(result?.isSuccess);
    const rollTotal = Number(result?.rollObj?.total);
    const description = result?.description ?? (success ? "Success" : "Failure");
    let consecutiveFailures = previousFailures;

    /*
     * The concealed question-mark marker has served its purpose once
     * the Initiative test has completed. Remove it on BOTH success
     * and failure so a failed Initiative does not leave the concealed
     * marker behind.
     */
    if (tokenDocument && canvas?.scene) {
        try {
            await removeConcealedActionMarker(
                tokenDocument.uuid,
                canvas.scene
            );
        }
        catch (error) {
            console.error(
                `${MODULE_ID} | Could not remove concealed Action Option marker after Initiative test`,
                error
            );
        }
    }

    if (success) {
        resetMissedInitiativeFailure(tokenUuid);
        try {
            await removeMissedInitiativeMarker(tokenUuid, canvas?.scene);
        } catch (error) {
            console.error(`${MODULE_ID} | Could not remove Missed Initiative marker after successful Initiative test`, error);
        }
    } else {
        consecutiveFailures = recordMissedInitiativeFailure(tokenUuid);
        try {
            await createOrUpdateMissedInitiativeMarker(tokenDocument, consecutiveFailures, canvas?.scene);
        } catch (error) {
            console.error(`${MODULE_ID} | Could not create/update Missed Initiative marker`, error);
        }
    }

    const storedSelection = getStoredActionSelection(actor.uuid);
    const actionOptionText = getActionOptionDisplayText(actor.uuid);

    /* A successful Initiative test is the ONLY point where the selected Action and Attack Option graphics are revealed. */
    if (success && tokenDocument && canvas?.scene && storedSelection?.selection?.options?.length) {
        try {
            await createRevealedActionOptionToken(tokenDocument, storedSelection.selection, canvas.scene);
        } catch (error) {
            console.error(`${MODULE_ID} | Could not reveal Action Option token`, error);
        }
    }

    const bonusText = missedInitiativeBonus === 0
        ? ""
        : ` <strong>(+${missedInitiativeBonus} Missed Initiative)</strong>`;

    const turnMessage = success
        ? `<div class="hm-action-turn-result"><h3>${escapeChatHTML(actor.name)}'s Turn</h3><p>Due to a quick reaction <strong>${escapeChatHTML(actor.name)}</strong> is able to take an action this round.</p><p><strong>Initiative EML Test:</strong> ${escapeChatHTML(String(initiativeEML))}${bonusText} — Success</p><p><strong>Action Option:</strong> ${escapeChatHTML(actionOptionText)}</p></div>`
        : `<div class="hm-action-turn-result"><h3>${escapeChatHTML(actor.name)}'s Turn</h3><p>Due to a slow reaction <strong>${escapeChatHTML(actor.name)}</strong> has failed to take an action this round.</p><p><strong>Initiative EML Test:</strong> ${escapeChatHTML(String(initiativeEML))}${bonusText} — Failure</p><p><strong>Consecutive Failed Initiative:</strong> ${consecutiveFailures}</p></div>`;

    await ChatMessage.create({
        content: turnMessage,
        flags: {
            [MODULE_ID]: {
                actionOptionTurn: true,
                actorUuid: actor.uuid,
                baseInitiativeEML,
                missedInitiativeBonus,
                initiativeEML,
                initiativeRoll: Number.isFinite(rollTotal) ? rollTotal : null,
                initiativeDescription: description,
                initiativeSuccess: success,
                consecutiveInitiativeFailures: consecutiveFailures
            }
        }
    });

    console.log(`${MODULE_ID} | ${actor.name} Initiative EML test:`, {
        baseEML: baseInitiativeEML,
        missedInitiativeBonus,
        eml: initiativeEML,
        roll: rollTotal,
        success,
        description,
        consecutiveFailures,
        actionOption: success ? actionOptionText : "Concealed (Initiative failed)"
    });
}


/*
 * Foundry fires updateCombat when the combat turn changes.
 *
 * We only process when the turn itself changes, rather than
 * every combat update.
 */
Hooks.on(
    "createCombat",
    combat => {

        if (!game?.user?.isGM) {
            return;
        }

        clearMissedInitiativeTracking();

        void ensureChooseActionOptionsCombatant(combat).catch(error => {
            console.error(
                `${MODULE_ID} | Could not prepare the Choose Action Options combatant when combat was created`,
                error
            );

            ui.notifications?.error?.(
                "HarnMaster Action Options could not create its Choose Action Options combatant. See the console for details."
            );
        });
    }
);


Hooks.on(
    "deleteCombat",
    combat => {
        if (!game?.user?.isGM) return;

        /*
         * Foundry's End Combat button deletes the Combat document.
         * The Combat document therefore does not necessarily receive
         * an updateCombat event with started:false before it disappears.
         * Perform the full marker cleanup here as the primary path.
         */
        void cleanupCombatMarkers(combat);
    }
);


async function cleanupCombatMarkers(combat) {
    if (!game?.user?.isGM) return;

    /*
     * This is safe to call from either updateCombat or deleteCombat.
     * The cleanup functions only remove Tiles carrying this module's
     * own flags, so unrelated Scene Tiles are never touched.
     */
    const scene = combat?.scene ?? canvas?.scene;
    const clearedSelections = hiddenActionSelections.size;

    hiddenActionSelections.clear();
    clearMissedInitiativeTracking();
    previousActionOptionTurnTokenUuid = null;

    for (const key of [...processedCombatTurns]) {
        if (key.startsWith(`${combat?.id}:`)) {
            processedCombatTurns.delete(key);
        }
    }

    try {
        const removedConcealed = await removeAllConcealedActionMarkers(scene);
        const removedRevealed = await removeAllRevealedActionOptionTokens(scene);
        const removedMissedInitiative = await removeAllMissedInitiativeMarkers(scene);

        console.log(`${MODULE_ID} | Combat ended: removed ${removedConcealed} concealed Action Option marker(s), ${removedRevealed} revealed Action Option token(s), and ${removedMissedInitiative} Missed Initiative marker(s). Cleared ${clearedSelections} stored Action Option selection(s).`);
    } catch (error) {
        console.error(`${MODULE_ID} | Could not clean up Action Option and Missed Initiative markers when combat ended`, error);
        ui.notifications?.error?.(
            "HarnMaster Action Options could not remove all combat markers when combat ended. See the console for details."
        );
    }
}


Hooks.on(
    "updateCombat",
    (
        combat,
        changes
    ) => {

        if (
            !game?.user?.isGM
        ) {
            return;
        }

        /*
         * When the End Combat button changes combat.started from true
         * to false, remove every Action Option and Missed Initiative
         * marker created by this module and clear the combat's runtime state.
         */
        if (
            changes.started === false
        ) {
            void cleanupCombatMarkers(combat);
            return;
        }

        /*
         * When combat is started, create/reuse the hidden control
         * Actor, create/reuse its Scene Token, add it to Combat,
         * and force its initiative to 1000 before processing the
         * active turn.
         */
        if (
            changes.started === true
        ) {

            void (async () => {

                try {

                    await ensureChooseActionOptionsCombatant(
                        combat
                    );

                }

                catch (error) {

                    console.error(
                        `${MODULE_ID} | Could not prepare the Choose Action Options combatant`,
                        error
                    );

                    ui.notifications?.error?.(
                        "HarnMaster Action Options could not create its Choose Action Options combatant. See the console for details."
                    );
                }

                await processActionOptionTurn(
                    combat
                );
            })();

            return;
        }

        if (
            changes.turn === undefined &&
            changes.round === undefined
        ) {
            return;
        }

        void processActionOptionTurn(
            combat
        );
    }
);


/* ============================================================
 * OPTION BUTTON
 * ============================================================ */

function buildOptionButton(
    option
) {
    const description =
        ACTION_OPTION_DESCRIPTIONS[option.id] ?? "";

    return `
        <button
            type="button"
            class="hm-action-option"
            data-option-id="${escapeHTML(option.id)}"
            data-category="${escapeHTML(option.category)}"
            data-description="${escapeHTML(description)}"
            title="${escapeHTML(description)}"
        >
            ${escapeHTML(option.name)}
        </button>
    `;
}


/* ============================================================
 * UPDATE SPECIAL OPTIONS
 * ============================================================ */

function getAttackOptionsForPrimary(primaryId) {
    switch (primaryId) {
        case "rest":
            return ACTION_ADJUSTMENTS.filter(a => a.id === "defensive-stance-rest");
        case "pass":
            return ACTION_ADJUSTMENTS.filter(a => a.id === "defensive-stance-pass");
        case "mounted-rest":
            return ACTION_ADJUSTMENTS.filter(a => a.id === "defensive-stance-mounted-rest");
        case "mounted-pass":
            return ACTION_ADJUSTMENTS.filter(a => a.id === "defensive-stance-mounted-pass");
        case "melee-attack":
            return ACTION_ADJUSTMENTS.filter(a => a.parent === "melee-attack");
        case "ambush":
            return ACTION_ADJUSTMENTS.filter(a => a.parent === "ambush");
        case "charge":
            return ACTION_ADJUSTMENTS.filter(a => a.parent === "charge");
        case "mounted-charge":
            return ACTION_ADJUSTMENTS.filter(a => a.parent === "mounted-charge");
        case "rider-attack":
            return ACTION_ADJUSTMENTS.filter(a => a.parent === "rider-attack");
        default:
            return [];
    }
}

function getAttackOptionDescription(id) {
    return ATTACK_OPTION_DESCRIPTIONS[id] ?? "";
}

function getDescriptionForSelectionItem(id) {
    if (ACTION_OPTION_DESCRIPTIONS[id]) {
        return ACTION_OPTION_DESCRIPTIONS[id];
    }

    if (ATTACK_OPTION_DESCRIPTIONS[id]) {
        return ATTACK_OPTION_DESCRIPTIONS[id];
    }

    /*
     * Mounted Charge uses its own adjustment IDs, but the rules
     * document defines the same Attack Option descriptions for
     * Shield Bash, Mighty Strike, Two-Weapon Fighting, etc.
     * Map the mounted IDs back to their base Attack Option IDs
     * so the description panel can display the full text.
     */
    const descriptionAliases = {
        "mounted-shield-bash": "shield-bash",
        "mounted-charge-two-weapon-fighting": "two-weapon-fighting",
        "mounted-charge-strike-to-stun": "strike-to-stun",
        "mounted-charge-all-out-attack": "all-out-attack",
        "mounted-charge-mighty-strike": "mighty-strike",
        "mounted-two-weapon-fighting": "two-weapon-fighting",
        "mounted-disarm": "disarm",
        "mounted-guarded-attack": "guarded-attack",
        "mounted-feint": "feint",
        "mounted-strike-to-stun": "strike-to-stun",
        "mounted-all-out-attack": "all-out-attack",
        "mounted-mighty-strike": "mighty-strike",
        "mounted-called-strike": "called-strike"
    };

    const alias = descriptionAliases[id];

    return alias
        ? (ATTACK_OPTION_DESCRIPTIONS[alias] ?? "")
        : "";
}

function updateActionOptionDescriptionPanel(html) {
    const panel = html.querySelector("#hm-action-description");
    if (!panel) return;

    const selectedItems = [
        ...html.querySelectorAll(".hm-action-option.selected, .hm-action-attack-option:checked")
    ];

    const items = selectedItems.map(element => ({
        id: element.dataset.optionId || element.dataset.adjustmentId,
        name: element.dataset.optionName || element.dataset.adjustmentName || element.textContent.trim(),
        description: element.dataset.description || getDescriptionForSelectionItem(
            element.dataset.optionId || element.dataset.adjustmentId
        )
    }));

    if (!items.length) {
        panel.innerHTML = `
            <div class="hm-action-none">
                Select an Action Option to view its description.
            </div>
        `;
        return;
    }

    panel.innerHTML = items.map(item => `
        <div class="hm-action-description-entry">
            <div class="hm-action-description-name">${escapeHTML(item.name)}</div>
            <div class="hm-action-description-text">${escapeHTML(item.description || "No description is available for this option.")}</div>
        </div>
    `).join("");
}

function getSelectedActionIds(html) {
    const options = [
        ...html.querySelectorAll(".hm-action-option.selected")
    ].map(button => button.dataset.optionId);

    const attackOptions = [
        ...html.querySelectorAll(".hm-action-attack-option:checked")
    ].map(input => input.dataset.optionId || input.dataset.adjustmentId);

    return {
        options,
        attackOptions
    };
}

function updateAttackOptions(html, primaryId) {
    const container = html.querySelector("#hm-action-attack-options");
    if (!container) return;

    const available = getAttackOptionsForPrimary(primaryId);
    const missileOptions =
        primaryId === "missile-attack"
            ? [
                { id: "aim-missile", name: "Aim Missile", kind: "option" },
                { id: "called-shot", name: "Called Shot", kind: "option" }
            ]
            : primaryId === "mounted-missile-attack"
                ? [
                    { id: "mounted-aim-missile", name: "Aim Missile", kind: "option" },
                    { id: "mounted-called-shot", name: "Called Shot", kind: "option" }
                ]
                : [];

    const attackEntries = [
        ...available.map(a => ({ ...a, kind: "adjustment" })),
        ...missileOptions
    ];

    if (!attackEntries.length) {
        container.innerHTML = `
            <div class="hm-action-none">
                This Action Option has no Available Options.
            </div>
        `;
        updateActionOptionDescriptionPanel(html);
        return;
    }

    container.innerHTML = attackEntries.map(option => {
        const description = getAttackOptionDescription(option.id);
        return `
            <label class="hm-action-attack-option-row" title="${escapeHTML(description)}">
                <input
                    type="checkbox"
                    class="hm-action-attack-option"
                    data-option-id="${option.kind === "option" ? escapeHTML(option.id) : ""}"
                    data-adjustment-id="${option.kind === "adjustment" ? escapeHTML(option.id) : ""}"
                    data-option-name="${escapeHTML(option.name)}"
                    data-adjustment-name="${escapeHTML(option.name)}"
                    data-description="${escapeHTML(description)}"
                >
                <span>${escapeHTML(option.name)}</span>
            </label>
        `;
    }).join("");

    for (const checkbox of container.querySelectorAll(".hm-action-attack-option")) {
        checkbox.addEventListener("change", () => {
            const id = checkbox.dataset.optionId || checkbox.dataset.adjustmentId;

            if (!checkbox.checked) {
                updateActionOptionDescriptionPanel(html);
                return;
            }

            const selectedPrimary =
                html.querySelector(".hm-action-option.selected")?.dataset.optionId;

            /* Missile Attack: Aim Missile and Called Shot are the only compatible pair. */
            if (selectedPrimary === "missile-attack" || selectedPrimary === "mounted-missile-attack") {
                const pair = selectedPrimary === "missile-attack"
                    ? ["aim-missile", "called-shot"]
                    : ["mounted-aim-missile", "mounted-called-shot"];

                if (!pair.includes(id)) {
                    checkbox.checked = false;
                }
            }

            /* Defensive Stance is mutually exclusive with everything else. */
            if (id.startsWith("defensive-stance-")) {
                for (const other of container.querySelectorAll(".hm-action-attack-option")) {
                    if (other !== checkbox) other.checked = false;
                }
            } else {
                for (const other of container.querySelectorAll(".hm-action-attack-option")) {
                    const otherId = other.dataset.optionId || other.dataset.adjustmentId;
                    if (other !== checkbox && otherId?.startsWith("defensive-stance-")) {
                        other.checked = false;
                    }
                }
            }

            /*
             * Melee Attack: Two-Weapon Fighting may combine with exactly
             * one other Melee Attack option. All other Melee Attack
             * options are mutually exclusive with each other.
             *
             * When a new mutually-exclusive option is checked, the
             * previously checked option is automatically unchecked.
             */
            if (selectedPrimary === "melee-attack") {
                const meleeOptions = [
                    ...container.querySelectorAll(
                        ".hm-action-attack-option"
                    )
                ].filter(
                    option =>
                        option.dataset.adjustmentId
                );

                const nonTWF = meleeOptions.filter(
                    option =>
                        option.dataset.adjustmentId !==
                        "two-weapon-fighting"
                );

                if (
                    checkbox.checked &&
                    id !== "two-weapon-fighting"
                ) {
                    /*
                     * A normal Melee Attack option replaces any previous
                     * normal Melee Attack option. TWF is allowed to remain
                     * checked alongside it.
                     */
                    for (const other of nonTWF) {
                        if (other !== checkbox) {
                            other.checked = false;
                        }
                    }
                }
            }

            /* Charge / Mounted Charge: one Group A and/or one Group B. */
            if (selectedPrimary === "charge" || selectedPrimary === "mounted-charge") {
                const groupA = selectedPrimary === "charge"
                    ? ["charge-two-weapon-fighting", "shield-bash"]
                    : ["mounted-charge-two-weapon-fighting", "mounted-shield-bash"];
                const groupB = selectedPrimary === "charge"
                    ? ["charge-strike-to-stun", "charge-all-out-attack", "charge-mighty-strike"]
                    : ["mounted-charge-strike-to-stun", "mounted-charge-all-out-attack", "mounted-charge-mighty-strike"];

                const group = groupA.includes(id) ? groupA : groupB;
                if (checkbox.checked && group.includes(id)) {
                    for (const other of container.querySelectorAll(".hm-action-attack-option")) {
                        const otherId = other.dataset.adjustmentId;
                        if (other !== checkbox && group.includes(otherId)) other.checked = false;
                    }
                }
            }

            updateActionOptionDescriptionPanel(html);
        });
    }

    updateActionOptionDescriptionPanel(html);
}

async function openActionOptionDialog() {
    const selectedCharacter = getSelectedCharacter();
    if (!selectedCharacter) {
        ui.notifications.warn("Please select exactly one character token.");
        return;
    }

    const { token, actor } = selectedCharacter;
    if (!userOwnsCharacter(actor)) {
        ui.notifications.error("You do not have permission to choose an Action Option for this character.");
        return;
    }

    const normalButtons = NORMAL_ACTION_OPTIONS
        .filter(option => option.category === "primary")
        .map(buildOptionButton)
        .join("");

    const mountedButtons = MOUNTED_ACTION_OPTIONS
        .filter(option => option.category === "primary")
        .map(buildOptionButton)
        .join("");

    const content = `
        <style>
            .hm-action-dialog { display:flex; flex-direction:column; gap:10px; font-size:14px; }
            .hm-action-character { font-size:18px; font-weight:bold; text-align:center; padding:8px; border-bottom:1px solid #666; }
            .hm-action-section { border:1px solid #555; border-radius:6px; padding:8px; }
            .hm-action-section-title { font-size:15px; font-weight:bold; margin-bottom:8px; text-align:center; }
            .hm-action-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:5px; }
            .hm-action-option { min-height:34px; padding:5px 6px; cursor:pointer; border:1px solid #555; border-radius:4px; background:#222; color:#ddd; }
            .hm-action-option:hover { background:#333; }
            .hm-action-option.selected { background:#8b0000; border-color:#ff5555; color:white; box-shadow:0 0 5px rgba(255,80,80,.6); }
            .hm-action-attack-list { display:grid; grid-template-columns:repeat(2,1fr); gap:5px; }
            .hm-action-attack-option-row { display:flex; align-items:flex-start; gap:7px; padding:7px; border:1px solid #555; border-radius:4px; background:#222; cursor:pointer; color:#ddd; }
            .hm-action-attack-option-row span { color:#ddd; }
            .hm-action-attack-option-row:hover { background:#333; }
            .hm-action-description { min-height:42px; max-height:260px; overflow-y:auto; background:#171717; border:1px solid #555; border-radius:4px; padding:9px; }
            .hm-action-description-entry + .hm-action-description-entry { margin-top:12px; padding-top:12px; border-top:1px solid #444; }
            .hm-action-description-name { font-weight:bold; color:#f0f0f0; margin-bottom:4px; }
            .hm-action-description-text { color:#ccc; line-height:1.35; white-space:pre-wrap; }
            .hm-action-none { color:#aaa; font-style:italic; text-align:center; padding:7px; }
            .hm-action-help { color:#aaa; font-size:12px; text-align:center; }
        </style>
        <div class="hm-action-dialog">
            <div class="hm-action-character">${escapeHTML(actor.name)}</div>
            <div class="hm-action-help">Select one Action Option. Available Attack Options will appear below it.</div>

            <div class="hm-action-section">
                <div class="hm-action-section-title">Action Options</div>
                <div class="hm-action-grid">${normalButtons}</div>
            </div>

            <div class="hm-action-section">
                <div class="hm-action-section-title">Mounted Action Options</div>
                <div class="hm-action-grid">${mountedButtons}</div>
            </div>

            <div class="hm-action-section">
                <div class="hm-action-section-title">Attack Options</div>
                <div id="hm-action-attack-options">
                    <div class="hm-action-none">Select an Action Option to see its Available Options.</div>
                </div>
            </div>

            <div class="hm-action-section">
                <div class="hm-action-section-title">Description</div>
                <div id="hm-action-description" class="hm-action-description">
                    <div class="hm-action-none">Select an Action Option to view its description.</div>
                </div>
            </div>
        </div>
    `;

    const dialog = new Dialog({
        title: "HarnMaster — Choose Action Option",
        content,
        buttons: {
            choose: {
                label: "Choose Action Option",
                callback: async html => {
                    const root = html[0] ?? html;
                    const optionIds = [...root.querySelectorAll(".hm-action-option.selected")]
                        .map(button => button.dataset.optionId);
                    const attackOptions = [...root.querySelectorAll(".hm-action-attack-option:checked")];
                    const missileOptionIds = attackOptions
                        .map(input => input.dataset.optionId)
                        .filter(Boolean);
                    const adjustmentIds = attackOptions
                        .map(input => input.dataset.adjustmentId)
                        .filter(Boolean);

                    const selection = {
                        options: [...optionIds, ...missileOptionIds],
                        adjustments: adjustmentIds
                    };

                    const validation = validateActionSelection(selection);
                    if (!validation.valid) {
                        ui.notifications.error(validation.reason);
                        return;
                    }

                    const result = await submitActionOptionSelection({ actor, token, selection });
                    if (result.success) ui.notifications.info(result.message);
                    else ui.notifications.error(result.message);
                }
            },
            cancel: { label: "Cancel" }
        },
        default: "choose",
        render: html => {
            const root = html[0] ?? html;
            const buttons = [...root.querySelectorAll(".hm-action-option")];

            for (const button of buttons) {
                button.addEventListener("click", () => {
                    const selectedId = button.dataset.optionId;

                    /* Aiming and Called Shot are selected only through Missile Attack's Available Options. */
                    if (selectedId === "aim-missile" || selectedId === "called-shot" ||
                        selectedId === "mounted-aim-missile" || selectedId === "mounted-called-shot") {
                        return;
                    }

                    for (const other of buttons) {
                        if (other !== button) other.classList.remove("selected");
                    }

                    button.classList.add("selected");

                    /* A primary Action Option change invalidates all previous Attack Options. */
                    updateAttackOptions(root, selectedId);
                    updateActionOptionDescriptionPanel(root);
                });
            }

            updateActionOptionDescriptionPanel(root);
        }
    }, { width: 760, height: "auto" });

    dialog.render(true);
}


/* ============================================================
 * AUTOMATIC PLAYER MACRO
 * ============================================================ */

async function ensurePlayerMacro() {

    if (!game?.macros) {
        return;
    }

    const existingMacro =
        game.macros.find(
            macro =>
                macro.name ===
                MACRO_NAME
        );

    if (existingMacro) {
        return;
    }

    try {

        await Macro.create(
            {
                name:
                    MACRO_NAME,

                type:
                    "script",

                img:
                    "icons/svg/sword.svg",

                command:
                    "HarnMasterActionOptions.openActionOptionDialog();",

                scope:
                    "global"
            }
        );

    }

    catch (error) {

        console.warn(
            `${MODULE_ID} | Could not create player macro.`,
            error
        );
    }
}


/* ============================================================
 * ACTION OPTION TILE HOVER EVENTS
 * ============================================================ */

Hooks.on(
    "drawTile",
    tile => {
        attachActionOptionTooltip(tile);
    }
);


Hooks.on(
    "destroyTile",
    tile => {
        removeActionOptionTooltipListeners(tile);
    }
);


Hooks.once(
    "canvasReady",
    () => {
        hideActionOptionTooltip();

        for (const tile of canvas?.tiles?.placeables ?? []) {
            attachActionOptionTooltip(tile);
        }
    }
);


/* ============================================================
 * TOKEN MOVEMENT
 * ============================================================ */

Hooks.on(
    "updateToken",
    async (
        token,
        changes
    ) => {

        if (
            changes.x === undefined &&
            changes.y === undefined &&
            changes.width === undefined &&
            changes.height === undefined
        ) {
            return;
        }

        await updateConcealedActionMarkerPosition(
            token
        );

        await updateRevealedActionOptionTokenPosition(
            token
        );

        await updateMissedInitiativeMarkerPosition(
            token
        );
    }
);


/* ============================================================
 * COMBAT TRACKER ACTION OPTION BUTTON
 * ============================================================ */

Hooks.on(
    "renderCombatTracker",
    (
        app,
        html
    ) => {

        /*
         * Foundry VTT 14 supplies a native HTMLElement here.
         * Do not use jQuery methods such as html.find().
         */
        const combatTracker =
            html?.querySelectorAll
                ? html
                : html?.[0];

        if (!combatTracker) {
            return;
        }

        const combatants =
            combatTracker.querySelectorAll(
                ".combatant"
            );

        const combat =
            game.combat;

        if (!combat) {
            return;
        }

        for (const element of combatants) {

            if (
                element.querySelector(
                    ".hm-action-option-button"
                )
            ) {
                continue;
            }

            const combatantId =
                element.dataset?.combatantId;

            if (!combatantId) {
                continue;
            }

            const combatant =
                combat.combatants?.get(
                    combatantId
                );

            if (!combatant) {
                continue;
            }

            const actor =
                combatant.actor;

            if (!actor) {
                continue;
            }

            const tokenDocument =
                combatant.token;

            const token =
                tokenDocument?.object ??
                tokenDocument;

            if (!token) {
                continue;
            }

            if (
                !userOwnsCharacter(
                    actor
                )
            ) {
                continue;
            }

            const button =
                document.createElement(
                    "a"
                );

            button.className =
                "hm-action-option-button";

            button.title =
                "Choose Action Option";

            button.innerHTML =
                '<i class="fas fa-question"></i>';

            button.style.cursor =
                "pointer";

            button.addEventListener(
                "click",
                async event => {
                    event.preventDefault();
                    event.stopPropagation();

                    try {
                        if (
                            token?.control
                        ) {
                            token.control({
                                releaseOthers:
                                    true
                            });
                        }

                        await openActionOptionDialog();
                    }
                    catch (error) {
                        console.error(
                            `${MODULE_ID} | Could not open Action Option dialog from Combat Tracker`,
                            error
                        );

                        ui.notifications.error(
                            error?.message ??
                            "Unable to open the Action Option dialog."
                        );
                    }
                }
            );

            const nameElement =
                element.querySelector(
                    ".token-name"
                ) ??
                element.querySelector(
                    ".name"
                ) ??
                element.firstElementChild;

            if (nameElement) {
                nameElement.after(
                    button
                );
            }
            else {
                element.appendChild(
                    button
                );
            }
        }
    }
);


/* ============================================================
 * READY
 * ============================================================ */

Hooks.once(
    "ready",
    async () => {

        globalThis.HarnMasterActionOptions = {

            MODULE_ID,

            MACRO_NAME,

            ACTION_OPTIONS,

            NORMAL_ACTION_OPTIONS,

            MOUNTED_ACTION_OPTIONS,

            ACTION_ADJUSTMENTS,

            getActionOption,

            getActionAdjustment,

            areActionOptionsCompatible,

            isAdjustmentAvailable,

            createEmptyActionSelection,

            validateActionSelection,

            getSelectedCharacter,

            userOwnsCharacter,

            submitActionOptionSelection,

            getStoredActionSelection,

            clearStoredActionSelection,

            getConcealedActionMarker,

            getStoredConcealedActionMarker,

            createOrUpdateConcealedActionMarker,

            removeConcealedActionMarker,

            removeAllConcealedActionMarkers,

            getStoredRevealedActionOptionToken,

            createRevealedActionOptionToken,

            removeRevealedActionOptionToken,

            removeAllRevealedActionOptionTokens,

            updateRevealedActionOptionTokenPosition,

            updateConcealedActionMarkerPosition,

            getMissedInitiativeFailureCount,
            getMissedInitiativeBonus,
            createOrUpdateMissedInitiativeMarker,
            removeMissedInitiativeMarker,
            updateMissedInitiativeMarkerPosition,
            clearMissedInitiativeTracking,

            openActionOptionDialog,

            updateAttackOptions,

            getDiceHM3,

            ensureChooseActionOptionsCombatant,

            processActionOptionTurn
        };

        initializeActionOptionSocket();

        await ensurePlayerMacro();
    }
);