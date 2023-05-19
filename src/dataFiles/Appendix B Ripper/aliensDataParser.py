from html.parser import HTMLParser
from typing import Any
from colorama import init as colorama_init
from colorama import Fore
from colorama import Back
from colorama import Style
from copy import deepcopy
import json

colorama_init()

alienNames = ["Ace",
              "AI",
              "Alchemist",
              "Alien",
              "Amoeba",
              "Anarchist",
              "Angler",
              "Animal",
              "Anti-Matter",
              "Arcade",
              "Architect",
              "Aristocrat",
              "Assistant",
              "Bandit",
              "Barbarian",
              "Bleeding Heart",
              "Bride",
              "Brute",
              "Bully",
              "Bulwark",
              "Butler",
              "Calculator",
              "Cavalry",
              "Changeling",
              "Chosen",
              "Chronos",
              "Chrysalis",
              "Citadel",
              "Claw, The",
              "Cloak",
              "Clone",
              "Converter",
              "Coordinator",
              "Coward",
              "Crusher",
              "Cryo",
              "Crystal",
              "Cudgel",
              "Cult, The",
              "Cyborg",
              "Daredevil",
              "Demon",
              "Dervish",
              "Deuce",
              "Dictator",
              "Diplomat",
              "Disease",
              "Doppelganger",
              "Empath",
              "Emperor",
              "Engineer",
              "Ethic",
              "Evil Twin",
              "Explorer",
              "Extortionist",
              "Fido",
              "Filch",
              "Filth",
              "Fire Dancer",
              "Fodder",
              "Fungus",
              "Fury",
              "Gambler",
              "General",
              "Genius",
              "Ghoul",
              "Glutton",
              "Gorgon",
              "Graviton",
              "Greenhorn",
              "Grudge",
              "Grumpus",
              "Guerrilla",
              "Hacker",
              "Hate",
              "Healer",
              "Horde",
              "Host",
              "Human",
              "Hunger",
              "Hypochondriac",
              "Industrialist",
              "Invader",
              "Joker",
              "Judge",
              "Kamikaze",
              "Klutz",
              "Laser",
              "Leviathan",
              "Lightning",
              "Lizard",
              "Locust",
              "Loser",
              "Love",
              "Lunatic",
              "Machine",
              "Macron",
              "Magician",
              "Masochist",
              "Maven",
              "Mercenary",
              "Merchant",
              "Mesmer",
              "Mimic",
              "Mind",
              "Mirage",
              "Mirror",
              "Miser",
              "Mite",
              "Moocher",
              "Mouth",
              "Muckraker",
              "Multitude",
              "Mutant",
              "Nanny",
              "Neighbor",
              "Nightmare",
              "Observer",
              "Oligarch",
              "Oracle",
              "Outlaw",
              "Pacifist",
              "Pack Rat",
              "Parasite",
              "Particle",
              "Patriot",
              "Peddler",
              "Pentaform",
              "Perfectionist",
              "Phantasm",
              "Philanthropist",
              "Pickpocket",
              "Pirate",
              "Plant",
              "Poison",
              "Porcupine",
              "Pretender",
              "Prophet",
              "Pygmy",
              "Quartermaster",
              "Reactor",
              "Reborn",
              "Reincarnator",
              "Relic",
              "Remora",
              "Remote",
              "Reserve",
              "Roach",
              "Saboteur",
              "Sadist",
              "Sapient",
              "Scavenger",
              "Schizoid",
              "Seeker",
              "Shadow",
              "Sheriff",
              "Siren",
              "Skeptic",
              "Sloth",
              "Sneak",
              "Sniveler",
              "Sorcerer",
              "Spiff",
              "Squee",
              "Sting",
              "Surgeon",
              "Swindler",
              "Sycophant",
              "Symbiote",
              "Tick-Tock",
              "Tide",
              "Tortoise",
              "Tourist",
              "Trader",
              "Trickster",
              "Tripler",
              "Tyrant",
              "Usurper",
              "Vacuum",
              "Virus",
              "Visionary",
              "Void",
              "Vox",
              "Voyager",
              "Vulch",
              "Warhawk",
              "Warpish",
              "Warrior",
              "Whirligig",
              "Will",
              "Winner",
              "Worm",
              "Wormhole",
              "Xenophile",
              "Yin-Yang",
              "Zombie"]

alienNames.sort()


class PhaseTiming:
    def __init__(self,
                 startTurn=False,
                 regroup=False,
                 destiny=False,
                 launch=False,
                 alliance=False,
                 planning=False,
                 reveal=False,
                 resolution=False):
        self.startTurn = startTurn
        self.regroup = regroup
        self.destiny = destiny
        self.launch = launch
        self.alliance = alliance
        self.planning = planning
        self.reveal = reveal
        self.resolution = resolution

    def __str__(self):
        return ''.join([f'({__atr})' for __atr in self.__dict__ if self.__dict__[__atr]])


class Timing:
    def __init__(self,
                 phases=PhaseTiming(),
                 player="",
                 choice=""):
        self.player = player
        self.choice = choice
        self.phases = deepcopy(phases)

    def strip(self, *args, **kwargs):
        selfCopy = deepcopy(self)
        selfCopy.player.strip(*args, **kwargs)
        if type(selfCopy.player) == str:
            while selfCopy.player.count('  ') > 0 or selfCopy.player.count('\n\n') > 0:
                selfCopy.player = selfCopy.player.replace('  ', ' ')
                selfCopy.player = selfCopy.player.replace('\n\n', '\n')

        selfCopy.choice.strip(*args, **kwargs)
        if type(selfCopy.choice) == str:
            while selfCopy.choice.count('  ') > 0 or selfCopy.choice.count('\n\n') > 0:
                selfCopy.choice = selfCopy.choice.replace('  ', ' ')
                selfCopy.choice = selfCopy.choice.replace('\n\n', '\n')
        return selfCopy

    def __str__(self):
        return f'({self.player})({self.choice}){self.phases}'.replace('()', '')


class Alien:
    def __init__(self,
                 name="",
                 alert="",
                 short="",
                 gameSetup="",
                 powerName="",
                 powerBody="",
                 powerTiming=Timing(),
                 history="",
                 wildBody="",
                 wildTiming=Timing(),
                 superBody="",
                 superTiming=Timing(),
                 notes=""):
        self.name = name
        self.alert = alert
        self.short = short
        self.gameSetup = gameSetup
        self.powerName = powerName
        self.powerBody = powerBody
        self.powerTiming = deepcopy(powerTiming)
        self.history = history
        self.wildBody = wildBody
        self.wildTiming = deepcopy(wildTiming)
        self.superBody = superBody
        self.superTiming = deepcopy(superTiming)
        self.notes = notes

    # def __setattr__(self, __name: str, __value: Any) -> None:
    #     if type(__value) == str:
    #         __value = __value.strip(' \t\x0b\x0c')
    #         while __value.count('  ') > 0 and __value.count('\n\n') > 0:
    #             __value.replace('  ', ' ')
    #             __value.replace('\n\n', '\n')
    #     self.__dict__[__name] = __value

    def strip(self):
        for __atr in self.__dict__:
            if type(self.__dict__[__atr]) == str:
                self.__dict__[__atr] = self.__dict__[__atr].replace('{', '')
                self.__dict__[__atr] = self.__dict__[__atr].replace('}', '')
                while self.__dict__[__atr].count('  ') > 0 or self.__dict__[__atr].count('\n\n') > 0:
                    self.__dict__[__atr] = self.__dict__[__atr].replace('  ', ' ')
                    self.__dict__[__atr] = self.__dict__[__atr].replace('\n\n', '\n')
            self.__dict__[__atr] = self.__dict__[__atr].strip()

    def __str__(self):
        # return f'''{Style.BRIGHT}{self.name}{Style.RESET_ALL}
        # {self.short}
        # {Style.BRIGHT}Game Setup: {Style.RESET_ALL}{self.gameSetup}
        # {Style.BRIGHT}{self.powerName}{Style.RESET_ALL}{self.powerBody.replace('may use this power', f'{Style.BRIGHT}may use{Style.RESET_ALL} this power').replace('use this power', f'{Style.BRIGHT}use{Style.RESET_ALL} this power')}
        # '''
        return f'''{self.name}|
{self.alert}|
{self.short}|
{self.gameSetup}|
{self.powerName}|
{self.powerBody}|
{self.powerTiming}|
{self.history}|
{self.wildBody}|
{self.wildTiming}|
{self.superBody}|
{self.superTiming}|
{self.notes}'''


normalAlienDetails: list[Alien] = []
revisedAlienDetails: list[Alien] = []


class CosmicHTMLParser(HTMLParser):
    def __init__(self, alienDetails: list[Alien], revisions=True):
        self.currentTags: list[str] = []
        self.isAlien = False
        self.revisions = revisions
        self.alienDetails: list[Alien] = alienDetails

        # initialize the base class
        HTMLParser.__init__(self)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'font' and attrs['color'] == '#FF0000':
            self.currentTags.append("critical")
        elif tag == 'span' and attrs['style'] == 'color: #999999;':
            self.currentTags.append("nitpick")
        elif tag == 'font' and attrs['color'] == '#0000FF':
            self.currentTags.append("official")
        elif tag == 'span' and attrs['style'] == 'color: #00CC00;':
            self.currentTags.append("opinionated")
        elif tag == 'span' and attrs['style'] == 'background-color: #DDDDDD;':
            self.currentTags.append("reference")
        else:
            self.currentTags.append(tag)

        if tag == 'br':
            if self.alienDetails[-1].notes:
                self.alienDetails[-1].notes += '\n'
            elif self.alienDetails[-1].wildTiming.player:
                self.alienDetails[-1].superBody += '\n'
            elif self.alienDetails[-1].history:
                self.alienDetails[-1].wildBody += '\n'
            else:
                self.alienDetails[-1].powerBody += '\n'

    def handle_endtag(self, tag):
        if tag == "font" and "critical" in self.currentTags:
            self.currentTags.remove("critical")
        elif tag == "span" and "nitpick" in self.currentTags:
            self.currentTags.remove("nitpick")
        elif tag == "font" and "official" in self.currentTags:
            self.currentTags.remove("official")
        elif tag == "span" and "opinionated" in self.currentTags:
            self.currentTags.remove("opinionated")
        elif tag == "span" and "reference" in self.currentTags:
            self.currentTags.remove("reference")
        else:
            self.currentTags.remove(tag)

    def handle_data(self, data):

        if self.currentTags.count('span') == 2 and self.currentTags.count('b') == 1:
            if data in alienNames:
                self.alienDetails.append(Alien())
                self.alienDetails[-1].name = data
                self.gameSetup = False
                self.isAlien = True
                print(len(self.alienDetails) - 1, data,
                      alienNames[len(self.alienDetails) - 1])
            else:
                self.isAlien = False

        elif self.isAlien and self.alienDetails[-1].notes and not data in ["(", ")", "\n"]:
            self.alienDetails[-1].notes += data

        elif (self.isAlien
              and (
                  ((self.revisions or (not self.revisions and self.currentTags.count('official') > 0)) and self.currentTags.count('strike') == 0)
                  or
                  ((not self.revisions) and ((self.currentTags.count('strike') > 0) or (len(set(self.currentTags) & {"critical", "nitpick", "reference"}) == 0)))
                  )
                and not data in ["(", ")", "\n"]):
            if (self.currentTags.count('b') == 1 and self.currentTags.count('i') == 1):
                if self.gameSetup:
                    self.alienDetails[-1].gameSetup += data
                elif self.alienDetails[-1].notes:
                    self.alienDetails[-1].notes += data
                elif self.alienDetails[-1].wildTiming.player:
                    self.alienDetails[-1].superBody += data
                elif self.alienDetails[-1].history:
                    self.alienDetails[-1].wildBody += data
                else:
                    self.alienDetails[-1].powerBody += data
            elif self.currentTags.count('i') == 1:
                if self.alienDetails[-1].notes:
                    self.alienDetails[-1].notes += data
                else:
                    self.alienDetails[-1].history += data
            elif self.currentTags.count('b') == 1:
                if "Edited" in data:
                    self.alienDetails[-1].notes += data
                elif "Game Setup:" in data:
                    self.gameSetup = True
                else:
                    if 'You have the power' in data:
                        self.alienDetails[-1].powerName = data
                        self.gameSetup = False
                    elif self.alienDetails[-1].short:
                        if self.gameSetup:
                            self.alienDetails[-1].gameSetup += data
                        elif self.alienDetails[-1].notes:
                            self.alienDetails[-1].notes += data
                        elif self.alienDetails[-1].wildTiming.player:
                            self.alienDetails[-1].superBody += data
                        elif self.alienDetails[-1].history:
                            self.alienDetails[-1].wildBody += data
                        else:
                            self.alienDetails[-1].powerBody += data
                    else:
                        self.alienDetails[-1].short = data

            if self.currentTags.count('span') == 1 and data in ['(Green)', '(Yellow)', '(Red)']:
                self.alienDetails[-1].alert = data

            if ((len(self.currentTags) == 0
                or (len(self.currentTags) == 1 and self.currentTags[0] in ["critical", "nitpick", "official", "opinionated", "reference"] and (self.revisions or self.currentTags.count('official') > 0))
                or (len(self.currentTags) == 2 and len(set(self.currentTags) & {"critical", "nitpick", "opinionated", "reference"}) > 0 and self.currentTags.count('strike') == 1 and not self.revisions)
                )
                ):
                if self.gameSetup:
                    self.alienDetails[-1].gameSetup += data
                elif self.alienDetails[-1].notes:
                    self.alienDetails[-1].notes += data
                elif self.alienDetails[-1].wildTiming.player:
                    self.alienDetails[-1].superBody += data
                elif self.alienDetails[-1].history:
                    self.alienDetails[-1].wildBody += data
                else:
                    self.alienDetails[-1].powerBody += data

            if self.currentTags.count('font') == 1 and self.currentTags.count('u') == 1 and self.currentTags.count('span') == 1:
                # print(f"'{data}'")
                # print(self.alienDetails[-1].powerTiming)
                # print(self.alienDetails[-1].wildTiming)
                # print(self.alienDetails[-1].superTiming)
                if self.alienDetails[-1].wildTiming.player:
                    self.alienDetails[-1].superTiming.player = data
                elif self.alienDetails[-1].powerTiming.player:
                    self.alienDetails[-1].wildTiming.player = data
                else:
                    self.alienDetails[-1].powerTiming.player = data

            if self.currentTags.count('u') == 1 and self.currentTags.count('span') == 2:
                data = data.strip()
                # print(f"'{data}'")
                # print(self.alienDetails[-1].powerTiming)
                # print(self.alienDetails[-1].wildTiming)
                # print(self.alienDetails[-1].superTiming)
                if self.alienDetails[-1].superTiming.player:
                    if data == "Start Turn":
                        self.alienDetails[-1].superTiming.phases.startTurn = True
                    elif data == "Regroup":
                        self.alienDetails[-1].superTiming.phases.regroup = True
                    elif data == "Destiny":
                        self.alienDetails[-1].superTiming.phases.destiny = True
                    elif data == "Launch":
                        self.alienDetails[-1].superTiming.phases.launch = True
                    elif data == "Alliance":
                        self.alienDetails[-1].superTiming.phases.alliance = True
                    elif data == "Planning":
                        self.alienDetails[-1].superTiming.phases.planning = True
                    elif data == "Reveal":
                        self.alienDetails[-1].superTiming.phases.reveal = True
                    elif data == "Resolution":
                        self.alienDetails[-1].superTiming.phases.resolution = True
                    elif data == "Any Phase":
                        self.alienDetails[-1].superTiming.phases.startTurn = True
                        self.alienDetails[-1].superTiming.phases.regroup = True
                        self.alienDetails[-1].superTiming.phases.destiny = True
                        self.alienDetails[-1].superTiming.phases.launch = True
                        self.alienDetails[-1].superTiming.phases.alliance = True
                        self.alienDetails[-1].superTiming.phases.planning = True
                        self.alienDetails[-1].superTiming.phases.reveal = True
                        self.alienDetails[-1].superTiming.phases.resolution = True

                elif self.alienDetails[-1].wildTiming.player:
                    if data == "Start Turn":
                        self.alienDetails[-1].wildTiming.phases.startTurn = True
                    elif data == "Regroup":
                        self.alienDetails[-1].wildTiming.phases.regroup = True
                    elif data == "Destiny":
                        self.alienDetails[-1].wildTiming.phases.destiny = True
                    elif data == "Launch":
                        self.alienDetails[-1].wildTiming.phases.launch = True
                    elif data == "Alliance":
                        self.alienDetails[-1].wildTiming.phases.alliance = True
                    elif data == "Planning":
                        self.alienDetails[-1].wildTiming.phases.planning = True
                    elif data == "Reveal":
                        self.alienDetails[-1].wildTiming.phases.reveal = True
                    elif data == "Resolution":
                        self.alienDetails[-1].wildTiming.phases.resolution = True
                    elif data == "Any Phase":
                        self.alienDetails[-1].wildTiming.phases.startTurn = True
                        self.alienDetails[-1].wildTiming.phases.regroup = True
                        self.alienDetails[-1].wildTiming.phases.destiny = True
                        self.alienDetails[-1].wildTiming.phases.launch = True
                        self.alienDetails[-1].wildTiming.phases.alliance = True
                        self.alienDetails[-1].wildTiming.phases.planning = True
                        self.alienDetails[-1].wildTiming.phases.reveal = True
                        self.alienDetails[-1].wildTiming.phases.resolution = True

                elif self.alienDetails[-1].powerTiming.player:
                    if self.alienDetails[-1].powerTiming.choice:
                        if data == "Start Turn":
                            self.alienDetails[-1].powerTiming.phases.startTurn = True
                        elif data == "Regroup":
                            self.alienDetails[-1].powerTiming.phases.regroup = True
                        elif data == "Destiny":
                            self.alienDetails[-1].powerTiming.phases.destiny = True
                        elif data == "Launch":
                            self.alienDetails[-1].powerTiming.phases.launch = True
                        elif data == "Alliance":
                            self.alienDetails[-1].powerTiming.phases.alliance = True
                        elif data == "Planning":
                            self.alienDetails[-1].powerTiming.phases.planning = True
                        elif data == "Reveal":
                            self.alienDetails[-1].powerTiming.phases.reveal = True
                        elif data == "Resolution":
                            self.alienDetails[-1].powerTiming.phases.resolution = True
                    else:
                        self.alienDetails[-1].powerTiming.choice = data


parser = CosmicHTMLParser(revisedAlienDetails)
with open('src/dataFiles/Appendix B Ripper/aliensDataOG.html', 'r') as fileReader:
    parser.feed(fileReader.read())
parser = CosmicHTMLParser(normalAlienDetails, revisions=False)
with open('src/dataFiles/Appendix B Ripper/aliensDataOG.html', 'r') as fileReader:
    parser.feed(fileReader.read())

print(len(normalAlienDetails))

for alien in revisedAlienDetails:
    alien.strip()
for alien in normalAlienDetails:
    alien.strip()

def serialize(obj):
    """JSON serializer for objects not serializable by default json code"""

    # if isinstance(obj, date):
    #     serial = obj.isoformat()
    #     return serial

    # if isinstance(obj, time):
    #     serial = obj.isoformat()
    #     return serial

    return obj.__dict__

# with open('src/dataFiles/originalAliens.json', 'w', encoding='utf-8') as f:
#     json.dump(normalAlienDetails, f, ensure_ascii=False, indent=4, default=serialize)

# with open('src/dataFiles/revisedAliens.json', 'w', encoding='utf-8') as f:
#     json.dump(revisedAlienDetails, f, ensure_ascii=False, indent=4, default=serialize)

while True:
    index = int(input('Get alien ID: '))
    print(normalAlienDetails[index])