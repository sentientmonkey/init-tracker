# Initiative Tracker

This is a very simple ininitiative tracker for RPGs. My target is D&D 5E, but I'm sure it could be used for others. It is implemented in react for easy hosting and no saved state (local to browser).

## TODO list

Ordered list of features I'm thinking about...
* [x] Handle ties
* [x] Add reset to clear round state
* [x] Keep track of time based on turns and rounds (6 seconds per turn)
* [X] Save state in local storage (to handle refresh cases)
* [ ] Save notes per character for statuses
* [ ] Add AC so hit/miss checks are faster
* [ ] Allow DEX to be updated for future combat
* [ ] Maybe condition icons?

Future features that would require saving state to a backend...
* [ ] Save characters for repeat encounters
* [ ] Live updates with a shareable link
* [ ] Pull/import character data from other sources

## Why did you make this?
I DM a regular group and we've had good experiences with tracking initiatives in a few simple ways: DM notes, whiteboard, tents, but all of them are a bit cumbersome. There are a number of trackers I've seen, but normally they have a ton of features for DMs that aren't great to share for others. We have a slighly larger group (7), so I like showing that your turn is coming up so you can prep and even pre-roll to keep the action moving.

## Why don't you have feature X?
I really wanted to focus a tool that has just enough information to keep encounters flowing. I may have opted-out of certain features


## What license is this under?
[BSD 3-clause](LICENSE.txt)

## Boostraped via create-react-app

Guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
