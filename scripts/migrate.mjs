import fs from 'fs';
import fetch from 'node-fetch';
import faunaClient from './fauna-apollo-client.mjs';
import faunadb from 'faunadb';
const fql = faunadb.query;

const {
  VITE_FAUNA_GRAPHQL_DOMAIN,
  VITE_FAUNA_HTTPS,
  VITE_FAUNA_SECRET,
} = process.env;

const { Collection, Update, Index, Map, Match, Lambda, Paginate, Create, If, Exists, CreateIndex, Query, Get, Var, IsEmpty, Let, Ref, Select, Role, TimeAdd, Now, Call, Login, Function, Logout, HasCurrentIdentity, CurrentIdentity, CreateRole } = fql;

// This script migrates the database schema to the database server
const run = async () =>
{
  // Establish connection with database
  console.info('Connecting to database...');

  console.info('Migrating schema...');
  // Read the schema from the .graphql file
  const stream = fs.createReadStream('schema.graphql');
  // Import schema into Fauna GraphQL
  await fetch(`http${VITE_FAUNA_HTTPS === true ? 's' : ''}://${VITE_FAUNA_GRAPHQL_DOMAIN}/import`, {
    method: 'POST',
    body: stream,
    headers: {
      'Authorization': `Bearer ${VITE_FAUNA_SECRET}`,
      'Content-Type': 'application/octet-stream',
    }
  });

  // Create custom indexes
  const musicianByUserId = {
    name: 'musician_by_userId',
    source: Collection('Musician'),
    unique: true,
    terms: [
      { field: ['data', 'user'] },
    ],
  };

  const musiciansByCity = {
    name: 'musicians_by_city',
    source: Collection('Musician'),
    unique: false,
    terms: [
      { field: ['data', 'city'] },
    ],
  };

  const musiciansByStyle = {
    name: 'musicians_by_style',
    source: Collection('MusicianStyle'),
    unique: false,
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'musician'] }
    ]
  };

  const musiciansByInstrument = {
    name: 'musicians_by_instrument',
    source: Collection('Musician'),
    unique: false,
    terms: [
      { field: ['data', 'instrument'] },
    ],
    values: [
      { field: ['data', 'musician'] }
    ]
  };

  const bandsByCity = {
    name: 'bands_by_city',
    source: Collection('Band'),
    unique: false,
    terms: [
      { field: ['data', 'city'] },
    ],
  };

  const bandsByStyle = {
    name: 'bands_by_style',
    source: Collection('BandStyle'),
    unique: false,
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'band'] }
    ]
  };

  const musicianAdsByStyle = {
    name: 'musicianAds_by_style',
    source: Collection('MusicianAdStyle'),
    unique: false,
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'musicianAd'] }
    ]
  };

  const musicianAdsByCity = {
    name: 'musicianAds_by_city',
    source: Collection('MusicianAd'),
    unique: false,
    terms: [
      { field: ['data', 'city'] },
    ]
  };


  const bandAdsByStyle = {
    name: 'bandAds_by_style',
    source: Collection('BandAdStyle'),
    unique: false,
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'bandAd'] }
    ]
  };

  const bandAdsByCity = {
    name: 'bandAds_by_city',
    source: Collection('BandAd'),
    unique: false,
    terms: [
      { field: ['data', 'city'] },
    ]
  };

  const userByEmail = {
    name: "user_by_email",
    source: Collection("User"),
    terms: [{ field: ["data", "email"] }],
    unique: true,
    serialized: true
  };

  console.info('Creating custom indexes...');
  console.info('Creating custom index musician_by_userId');
  await faunaClient.query(
    If(
      Exists(
        Index('musician_by_userId')
      ),
      Update(
        Index('musician_by_userId'),
        musicianByUserId
      ),
      CreateIndex(musicianByUserId)
    )
  );

  console.info('Creating custom index musicians_by_city...');
  await faunaClient.query(
    If(
      Exists(
        Index('musicians_by_city')
      ),
      Update(
        Index('musicians_by_city'),
        musiciansByCity
      ),
      CreateIndex(musiciansByCity)
    )
  );

  console.info('Creating custom index musicians_by_style...');
  await faunaClient.query(
    If(
      Exists(
        Index('musicians_by_style')
      ),
      Update(
        Index('musicians_by_style'),
        musiciansByStyle
      ),
      CreateIndex(musiciansByStyle)
    )
  );

  console.info('Creating custom index musicians_by_instrument...');
  await faunaClient.query(
    If(
      Exists(
        Index('musicians_by_instrument')
      ),
      Update(
        Index('musicians_by_instrument'),
        musiciansByInstrument
      ),
      CreateIndex(musiciansByInstrument)
    )
  );

  console.info('Creating custom index bands_by_city...');
  await faunaClient.query(
    If(
      Exists(
        Index('bands_by_city')
      ),
      Update(
        Index('bands_by_city'),
        bandsByCity
      ),
      CreateIndex(bandsByCity)
    )
  );

  console.info('Creating custom index bands_by_style...');

  await faunaClient.query(
    If(
      Exists(
        Index('bands_by_style')
      ),
      Update(
        Index('bands_by_style'),
        bandsByStyle
      ),
      CreateIndex(bandsByStyle)
    )
  );


  console.info('Creating custom index musicianAds_by_style...');

  await faunaClient.query(
    If(
      Exists(
        Index('musicianAds_by_style')
      ),
      Update(
        Index('musicianAds_by_style'),
        musicianAdsByStyle
      ),
      CreateIndex(musicianAdsByStyle)
    )
  );

  console.info('Creating custom index musicianAds_by_city...');

  await faunaClient.query(
    If(
      Exists(
        Index('musicianAds_by_city')
      ),
      Update(
        Index('musicianAds_by_city'),
        musicianAdsByCity
      ),
      CreateIndex(musicianAdsByCity)
    )
  );

  console.info('Creating custom index bandAds_by_city...');

  await faunaClient.query(
    If(
      Exists(
        Index('bandAds_by_city')
      ),
      Update(
        Index('bandAds_by_city'),
        bandAdsByCity
      ),
      CreateIndex(bandAdsByCity)
    )
  );

  console.info('Creating custom index bandAds_by_style...');

  await faunaClient.query(
    If(
      Exists(
        Index('bandAds_by_style')
      ),
      Update(
        Index('bandAds_by_style'),
        bandAdsByStyle
      ),
      CreateIndex(bandAdsByStyle)
    )
  );

  console.info('Creating custom index user_by_email...');

  await faunaClient.query(
    If(
      Exists(
        Index('user_by_email')
      ),
      Update(
        Index('user_by_email'),
        userByEmail
      ),
      CreateIndex(userByEmail)
    )
  );


  // Create custom resolvers
  console.info('Creating custom resolvers...');

  console.info('Creating custom resolver musicianByUserId...');

  await faunaClient.query(
    Update(
      Function('musicianByUserId'),
      {
        body: Query(
          Lambda(
            "userId",
            Let(
              {
                array: Map(
                  Paginate(
                    Match(Index("musician_by_userId"), [
                      Ref(Collection("User"), Var("userId")),
                    ])
                  ),
                  Lambda("ref", Get(Var("ref")))
                ),
              },
              If(IsEmpty(Var("array")), null, Select(["data", 0], Var("array")))
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musiciansByCity...');

  await faunaClient.query(
    Update(
      Function('musiciansByCity'),
      {
        body: Query(
          Lambda(
            ["city", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("musicians_by_city"), Var("city")
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musiciansByStyleId...');

  await faunaClient.query(
    Update(
      Function('musiciansByStyleId'),
      {
        body: Query(
          Lambda(
            ["styleId", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("musicians_by_style"),
                      [
                        Ref(Collection("Style"), Var("styleId"))
                      ]
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver userAdminByBandId...');

  await faunaClient.query(
    Update(
      Function('userAdminByBandId'),
      {
        body: Query(
          Lambda(
            ["bandId"],
            Let(
              { band: Get(Ref(Collection("Band"), Var("bandId"))) },
              Select(["data", "admin"], Var("band"))
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musicianAdminByBandId...');

  await faunaClient.query(
    Update(
      Function('musicianAdminByBandId'),
      {
        body: Query(
          Lambda(
            ["bandId"],
            Let(
              {
                user: Call(Function("userAdminByBandId"), Var("bandId")),
                musician: Map(
                  Paginate(Match(Index("musician_by_userId"), Var("user"))),
                  Lambda("ref", Get(Var("ref")))
                ),
              },
              If(IsEmpty(Var("musician")), null, Select(["data", 0], Var("musician")))
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandMembersByBandId...');

  await faunaClient.query(
    Update(
      Function('bandMembersByBandId'),
      {
        body: Query(
          Lambda(
            ["bandId", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("band_members_by_band"),
                      [
                        Ref(Collection("Band"), Var("bandId"))
                      ]
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandsByStyleId...');

  await faunaClient.query(
    Update(
      Function('bandsByStyleId'),
      {
        body: Query(
          Lambda(
            ["styleId", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("bands_by_style"),
                      [
                        Ref(Collection("Style"), Var("styleId"))
                      ]
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );



  console.info('Creating custom resolver bandsByCity...');

  await faunaClient.query(
    Update(
      Function('bandsByCity'),
      {
        body: Query(
          Lambda(
            ["city", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("bands_by_city"), Var("city")
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musicianAdsByCity...');

  await faunaClient.query(
    Update(
      Function('musicianAdsByCity'),
      {
        body: Query(
          Lambda(
            ["city", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("musicianAds_by_city"), Var("city")
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandAdsByCity...');

  await faunaClient.query(
    Update(
      Function('bandAdsByCity'),
      {
        body: Query(
          Lambda(
            ["city", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("bandAds_by_city"), Var("city")
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musicianAdsByStyleId...');

  await faunaClient.query(
    Update(
      Function('musicianAdsByStyleId'),
      {
        body: Query(
          Lambda(
            ["styleId", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("musicianAds_by_style"),
                      [
                        Ref(Collection("Style"), Var("styleId"))
                      ]
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandAdsByStyleId...');

  await faunaClient.query(
    Update(
      Function('bandAdsByStyleId'),
      {
        body: Query(
          Lambda(
            ["styleId", "size", "after", "before"],
            Let(
              {
                array: Map(
                  Paginate(
                    Match(
                      Index("bandAds_by_style"),
                      [
                        Ref(Collection("Style"), Var("styleId"))
                      ]
                    )
                  ),
                  Lambda("ref", Get(Var("ref")))
                )
              },
              If(
                IsEmpty(Var("array")),
                null,
                Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver createUser...');

  await faunaClient.query(
    Update(
      Function('createUser'),
      {
        body: Query(
          Lambda(
            ["data"],
            Let({
              createdUser:
                Create(
                  Collection("User"),
                  {
                    credentials: { password: Select("password", Var("data")) },
                    data: {
                      firstName: Select("firstName", Var("data")),
                      lastName: Select("lastName", Var("data")),
                      email: Select("email", Var("data")),
                      role: Select("role", Var("data"))
                    }
                  })
            },
              Call(
                Function("login"),
                Var("data")
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver createMusician...');

  await faunaClient.query(
    Update(
      Function('createMusician'),
      {
        body: Query(
          Lambda(
            ["data"],
            Create(
              Collection("Musician"),
              {
                data: {
                  adminUser: Select("adminUser", Var("data")),
                  city: Select("city", Var("data")),
                  objective: Select("objective", Var("data")),
                  experience: Select("experience", Var("data"))
                }
              }
            )
          )
        )
      }
    )
  );

  // console.info('Creating custom resolver createBand...');

  // await faunaClient.query(
  //   Update(
  //     Function('createBand'),
  //     {
  //       body: Query(
  //         Lambda(
  //           ["data"],
  //           Create(
  //             Collection("Band"),
  //             {
  //               data: {
  //                 adminUser: Select("adminUser", Var("data")),
  //                 city: Select("city", Var("data")),
  //                 objective: Select("objective", Var("data")),
  //                 experience: Select("experience", Var("data"))
  //               }
  //             }
  //           )
  //         )
  //       )
  //     }
  //   )
  // );

  console.info('Creating custom resolver login...');

  // await faunaClient.query(
  //   Update(
  //     Function('login'),
  //     {
  //       body: Query(
  //         Lambda(
  //           ["email", "password", "size", "after", "before"],
  //           Login(
  //             Match(Index("user_by_email"), Var("email")),
  //             {
  //               password: Var("password"),
  //               ttl: TimeAdd(Now(), 2, "hour")
  //             }
  //           )
  //         )
  //       )
  //     }
  //   )
  // );

  await faunaClient.query(
    Update(
      Function("login"),
      {
        "body": Query(
          Lambda(
            ["data"],
            Let(
              {
                response: Login(
                  Match(Index("user_by_email"), Select("email", Var("data"))),
                  { password: Select("password", Var("data")) }
                )
              },
              {
                data: {
                  token: Select("secret", Var("response")),
                  adminUser: Select("instance", Var("response"))
                }
              }
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver logout...');
  await faunaClient.query(
    Update(
      Function("logout"),
      {
        "body": Query(
          Lambda(
            ["data"],
            Logout(
              true
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver current_user...');
  await faunaClient.query(
    Update(Function("current_user"), {
      "body": Query(
        Lambda([],
          If(HasCurrentIdentity(), Get(CurrentIdentity()), null)
        )
      )
    })
  );


  console.info('Updating role privileges...');

  faunaClient.query(

    // CreateRole({
    //   name: "User",
    //   membership: {
    //     resource: Collection("User")
    //   },
    Update(Role("User"), {
      privileges: [
        {
          resource: Collection("User"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("Musician"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("Band"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("BandAd"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("MusicianAd"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("Style"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("Instrument"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("AuthPayload"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("MusicianStyle"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("BandStyle"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("MusicianAdStyle"),
          actions: {
            read: true
          }
        },
        {
          resource: Collection("BandAdStyle"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musicians_by_city"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("bands_by_city"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musicians_by_style"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("bands_by_style"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("bandAds_by_style"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("bandAds_by_city"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musicianAds_by_city"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musicianAds_by_style"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("user_by_email"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allUsers"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allBands"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allMusicians"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allBandStyles"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allMusicianStyles"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allBandAds"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allMusicianAds"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allBandAdStyles"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allMusicianAdStyles"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allStyles"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("allInstruments"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("userByEmail"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("unique_Musician_adminUser"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musicians_by_instrument"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musicianAd_author_by_musician"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musicianStyle_musician_by_musician"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("bandStyle_band_by_band"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("bandAd_author_by_band"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("musician_by_userId"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("unique_Musician_user"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("unique_User_email"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("unique_Musician_adminUser"),
          actions: {
            read: true
          }
        },
        {
          resource: Index("band_members_by_band"),
          actions: {
            read: true
          }
        },
        {
          resource: Function('current_user'),
          actions: {
            call: true
          }
        },
        {
          resource: Function('logout'),
          actions: {
            call: true
          }
        },
      ]
    }
    )
  );
};

// Run main process
run().catch((err) =>
{
  console.error(err);
  process.exit(1);
});
