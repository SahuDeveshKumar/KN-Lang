Squad Adventurer {
   Quark name = "TOMMY";
   Quark bag = [];
   Quark location = "Entrance";

   Doodle collect(item) {
      bag.add(item);
      Print("Item collected: " + item + ". Move on");
   }

   Doodle inspectBag() {
      If(bag.length > 0) {
         Print("Your bag holds: " + bag.join(", "));
      } Else {
         Print("Your bag is empty.");
      }
   }
}

Squad Room {
   Quark roomInfo;
   Quark objects = [];
   Quark pathways = {};

   Doodle explore() {
      Print("\n" + roomInfo);
      If(objects.length > 0) {
         Print("You notice: " + objects.join(", "));
      }
      Print("Possible pathways: " + Object.keys(pathways).join(", "));
   }
}

Squad Game {
   Quark adventurer = new Adventurer();
   Quark rooms = [];
   Quark questCompleted = false;

   Doodle start() {
      Print("Greetings, Adventurer! Your journey begins...");

       SpinCycle(!questCompleted) {
         let room = rooms[adventurer.location];
         room.explore();

         let { action, target } = adventurer.chooseAction("\nYour action? (move directionName, collect itemName, inspect, solve riddleAnswer, use itemName): ");

         //let assume action will be name of action taking by adventurer and Target will be next to action command

         If(action == "move") {
            travel(room, target);
         }
         ElseIf(action == "collect") {
            claim(room, target);
         }
         ElseIf(action == "inspect") {
            adventurer.inspectBag();
         }
         ElseIf(action == "solve") {
            solveMystery(target);
         }
         ElseIf(action == "use") {
            unlockPath(target);
         } 
        Else {
            Print("Unclear command. Try again.");
         }
      }

      Print("The Adventure END'S HERE!!");
   }

   Doodle travel(room, direction) {
      If(room.pathways[direction]) {
         adventurer.location = room.pathways[direction];
         Print("You venture to: " + adventurer.location);
      } Else {
         Print("There is no path in this direction!!");
      }
   }

   Doodle claim(room, item) {
      If(room.objects.includes(item)) {
         adventurer.collect(item);
      } Else {
         Print("Item not found to collect.");
      }
   }

   Doodle solveMystery(answer) {
      If(adventurer.location === "Riddle Room") {
         If(answer.toLowerCase() === "echo") {
            Print("You have unlocked a hidden key!");
            rooms["Riddle Room"].objects.add("Golden Key");
         } Else {
            Print("The walls echo your incorrect guess. Try again.");
         }
      } Else {
         Print("No mystery in this room.");
      }
   }

   Doodle unlockPath(item) {
      If(adventurer.location === "Vault" && item === "Golden Key") {
         If(adventurer.bag.includes("Golden Key")) {
            Print("The key fits! The vault opens to untold treasures!");
            questCompleted = true;
         } Else {
            Print("No Golden key inside bag to unlock this.");
         }
      } Else {
         Print("Use Golden key to unlock.");
      }
   }
}


Quark roomData = {
   "Entrance": {
      roomInfo: "You are at the entrance of an ancient TOMB.",
      objects: ['torch'],
      pathways: { north: "Riddle Room", east: "Vault" }
   },
   "Riddle Room": {
      roomInfo: "A room filled with carvings: 'I speak without a mouth and hear without ears. What am I?'",
      objects: [],
      pathways: { south: "Entrance" }
   },
   "Vault": {
      roomInfo: "Room is locked!! Use Golden key to unlock.",
      objects: [],
      pathways: { west: "Entrance" }
   }
};


let game = new Game();
game.rooms.add(new Room(roomData["Entrance"]));
game.rooms.add(new Room(roomData["Riddle Room"]));
game.rooms.add(new Room(roomData["Vault"]));

game.start();
