# FIFA-CHAMPS

***S O O N.***

**V2 SCHEMAS**

> If you are not going to use mongoose Schema attributes/validations, there is no need to use "mongoose.Schema" to create a schema.

### USER SCHEMA

```js
const user = {
  id: '123',

  // [SCHEMA] ("public" schema) will be copied into other schemas that relies on user data;
  publicFields: {
    slack: {
      displayName: 'gil',
      icon: 'spechless-gil'
    },
  },

  // [SCHEMA] ("private" schema) this one will NOT be copied into another schemas
  privateFields: {
    password: '',
  },
};
```

### SEASON SCHEMA

```js
const season = {
  'jun/2018': {
    matches: [
      // [SCHEMA] match
      {
        // [SCHEMA] ChosenTeam
        awayTeam: {
          players: [
            { id, ...user.public }, // @baiano
            { id, ...user.public } // @rborcat
          ],
          score: 0,
          team: {
            name: 'Barcelona',
            league: 'La liga'
          },
        },

        date: '', // ISO FORMAT (the front-end is in charge of displaying it the way it prefers)

        // [SCHEMA] ChosenTeam
        homeTeam: {
          players: [
            { id, ...user.public }, // @gil
            { id, ...user.public } // @rborcat
          ],
          score: 3,
          team: {
            name: 'Real Madrid',
            league: 'La liga'
          },
        },

        isSeasonFinalMatch: true,

        summaryByPlayer: [
          {
            user: { id, ...user.public },
            hasPlayedAsHomeTeam: true,
            hasWonTheMatch: true,
            goalsScored: 3,
          },
        ],
      }
    ],

    // [SCHEMA] StatsByPlayer
    statsByPlayer: [
      {
        id,
        stats: {
          wins: 0,
          draws: 0,
          losses: 0,
          played: 0,
          points: 0,
          goalsAgainst: 0,
          goalsFor: 0,
          goalsDifference: 0
        },

        // [SCHEMA] user
        user: { id, ...user.public },
      }
    ],
  }
};
```

**V1 SCHEMA**

```js
const user = {
  slack: {
    displayName: 'gil',
    icon: 'spechless-gil'
  },
  password: '',
  matchesForSeason: {
    'jun/2018': [
      summary: {
        didWinTheMatch: true,
        isSeasonFinalMatch: true,
        goalsScored: 3,
        wasPlayingAsHomeTeam: true,
      },
      awayTeam: {
        players: ['@alan', '@baiano'],
        score: 0,
        team: {
          name: 'Barcelona',
          league: 'La liga'
        },
      },
      homeTeam: {
        players: ['@gil', '@rborcat'],
        score: 3,
        team: {
          name: 'Real Madrid',
          league: 'La liga'
        },
      },
    ]
  },
  statsForSeason: {
    'jun/2018': {
      wins: 0,
      draws: 0,
      losses: 0,
      played: 0,
      points: 0,
      goalsAgainst: 0,
      goalsFor: 0,
      goalsDifference: 0
    }
  }
}
```
