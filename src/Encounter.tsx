import React, { useState } from "react";
import { Button, Grid, List } from "@material-ui/core";
import Monster from "./Monster";
import Party from "./Party";
import Difficulty from "./Difficulty";
import XP from "./XP";
import uuid from "uuid/v1";

interface MonsterState {
  id: string;
  xp: number;
  count: number;
}

export interface EncounterState {
  monsters: MonsterState[];
  partyLevel: number;
  partySize: number;
}

export interface EncounterProps {}

interface INumberToNumberMap {
  [key: number]: number;
}

const MULTIPLIER: INumberToNumberMap = {
  0: 1,
  1: 1,
  2: 1.5,
  3: 2,
  4: 2,
  5: 2,
  6: 2,
  7: 2.5,
  8: 2.5,
  9: 2.5,
  10: 2.5,
  11: 3,
  12: 3,
  13: 3,
  14: 3,
  15: 4
};

const SMALL_MULTIPLIER: INumberToNumberMap = {
  0: 1.5,
  1: 1.5,
  2: 2,
  3: 2.5,
  4: 2.5,
  5: 2.5,
  6: 2.5,
  7: 3,
  8: 3,
  9: 3,
  10: 3,
  11: 4,
  12: 4,
  13: 4,
  14: 4,
  15: 4
};

const LARGE_MULTIPLIER: INumberToNumberMap = {
  0: 0.5,
  1: 0.5,
  2: 1,
  3: 1.5,
  4: 1.5,
  5: 1.5,
  6: 1.5,
  7: 2,
  8: 2,
  9: 2,
  10: 2,
  11: 2.5,
  12: 2.5,
  13: 2.5,
  14: 2.5,
  15: 3
};

function Encounter(props: EncounterProps) {
  const [monsters, setMonsters] = useState<MonsterState[]>([]);
  const [partyLevel, setPartyLevel] = useState(1);
  const [partySize, setPartySize] = useState(3);

  const addMonster = () => {
    setMonsters(monsters.concat({ id: uuid(), xp: 0, count: 1 }));
  };

  const removeMonster = (id: string) => {
    setMonsters(monsters.filter(m => m.id !== id));
  };

  const updateMonster = (id: string, xp: number, count: number) => {
    setMonsters(
      monsters.map(monster => {
        if (monster.id === id) {
          monster.xp = xp;
          monster.count = count;
        }
        return monster;
      })
    );
  };

  const calculateXP = (monsters: MonsterState[]): number =>
    monsters.map(m => m.xp).reduce((acc, curr) => acc + curr, 0);

  const smallParty = (size: number) => size < 3;
  const largeParty = (size: number) => size > 5;

  const fetchMultiplier = (index: number, size: number): number => {
    let table = MULTIPLIER;
    if (smallParty(size)) {
      table = SMALL_MULTIPLIER;
    }
    if (largeParty(size)) {
      table = LARGE_MULTIPLIER;
    }
    return table[index] || table[15];
  };

  const totalMonsters = (monsters: MonsterState[]): number =>
    monsters.map(m => m.count).reduce((acc, curr) => acc + curr, 0);

  const adjustXP = (multiplier: number, xp: number): number => multiplier * xp;

  const totalXP = calculateXP(monsters);
  const multiplier = fetchMultiplier(totalMonsters(monsters), partySize);
  const adjustedXP = adjustXP(multiplier, totalXP);

  const monsterElements = monsters.map(m => (
    <Monster
      key={m.id}
      id={m.id}
      xp={m.xp}
      count={m.count}
      onChangeMonster={updateMonster}
      onRemoveMonster={removeMonster}
    />
  ));

  return (
    <Grid container>
      <Grid item xs={6}>
        <p>
          Total XP <XP key={"total"} xp={totalXP} />
        </p>
        <p>
          Adjusted XP <XP key={"adjusted"} xp={adjustedXP} />
          (x {multiplier})
        </p>

        <Party
          size={partySize}
          level={partyLevel}
          onChangeLevel={setPartyLevel}
          onChangeSize={setPartySize}
        />

        <Button
          variant="contained"
          color="primary"
          className="add-monster"
          onClick={addMonster}
        >
          Add Monster
        </Button>

        <Difficulty xp={adjustedXP} level={partyLevel} size={partySize} />
      </Grid>
      <Grid item xs={4}>
        <List>{monsterElements}</List>
      </Grid>
    </Grid>
  );
}

export default Encounter;
