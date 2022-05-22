import faunaClient from './fauna-client.mjs';
import faunadb from 'faunadb';
const fql = faunadb.query;

const users = [
  { id: 1, email: 'michel@test.com', password: 'michelpw' },
  { id: 2, email: 'philippe@test.com', password: 'philippepw' },
  { id: 3, email: 'lucie@test.com', password: 'luciepw' },
  { id: 4, email: 'aline@test.com', password: 'alinepw' },
  { id: 5, email: 'bertrand@test.com', password: 'bertrandpw' },
  { id: 6, email: 'fabienne@test.com', password: 'fabiennepw' },
];

const musicians = [
  { id: 1, userId: 1, firstName: "Michel", lastName: "Dupont", bandId: 1, isBandAdmin: true, instrumentId: 1, city: 'Lyon', objective: 'Amateur', experience: "débutant" },
  { id: 2, userId: 2, firstName: "Philippe", lastName: "Morin", bandId: 2, isBandAdmin: false, instrumentId: 2, city: 'Paris', objective: 'Semi-Pro', experience: "confirmé" },
  { id: 3, userId: 3, firstName: "Lucie", lastName: "Tournelle", bandId: 0, isBandAdmin: false, instrumentId: 3, city: 'Lyon', objective: 'Pro', experience: "expert" },
  { id: 4, userId: 4, firstName: "Aline", lastName: "Poudret", bandId: 0, isBandAdmin: false, instrumentId: 4, city: 'Bordeaux', objective: 'Amateur', experience: "débutant" },
  { id: 5, userId: 5, firstName: "Bertrand", lastName: "Bouin", bandId: 2, isBandAdmin: true, instrumentId: 1, city: 'Paris', objective: 'Semi-Pro', experience: "confirmé" },
  { id: 6, userId: 6, firstName: "Fabienne", lastName: "Martin", bandId: 3, isBandAdmin: true, instrumentId: 2, city: 'Bordeaux', objective: 'Pro', experience: "expert" },
];

const bands = [
  { id: 1, adminId: 1, city: 'Lyon', objective: 'Amateur', experience: "débutant", name: "Lorem" },
  { id: 2, adminId: 5, city: 'Paris', objective: 'Semi-Pro', experience: "confirmé", name: "Ipsum" },
  { id: 3, adminId: 6, city: 'Bordeaux', objective: 'Pro', experience: "expert", name: "Dolor" },
];

const musicianAds = [
  { id: 1, authorId: 3, title: "Bassiste cherche groupe de rock", description: "Je suis bassiste et je cherche un groupe de rock à Lyon.", city: "Lyon" },
  { id: 2, authorId: 4, title: "Chanteuse cherche groupe de pop", description: "Je suis chanteuse et je cherche un groupe de pop à Bordeaux.", city: "Bordeaux" },
];
const bandAds = [
  { id: 1, authorId: 1, title: "Cherche Batteur", description: "On cherche un batteur pour notre groupe Lorem à Lyon.", city: "Lyon" },
  { id: 2, authorId: 2, title: "Cherche Guitariste", description: "On cherche un guitariste pour notre groupe Ipsum à Paris.", city: "Paris" },
  { id: 3, authorId: 1, title: "Cherche Bassiste", description: "On cherche un Basiste pour notre groupe Lorem à Lyon.", city: "Lyon", },
];

const styles = [
  { id: 1, name: "Rock" },
  { id: 2, name: "Pop" },
  { id: 3, name: "Metal" },
  { id: 4, name: "Hip-Hop" },
  { id: 5, name: "Jazz" },
  { id: 6, name: "Reggae" },
  { id: 7, name: "Funk" },
  { id: 8, name: "Indie" },
  { id: 9, name: "World" },
  { id: 10, name: "Electro" },
];

const musicianStyles = [
  { id: 1, musicianId: 1, styleId: 1 },
  { id: 2, musicianId: 2, styleId: 2 },
  { id: 3, musicianId: 3, styleId: 3 },
  { id: 4, musicianId: 4, styleId: 4 },
  { id: 5, musicianId: 3, styleId: 5 },
  { id: 6, musicianId: 1, styleId: 6 },
  { id: 7, musicianId: 4, styleId: 8 },
  { id: 8, musicianId: 1, styleId: 9 },
  { id: 9, musicianId: 2, styleId: 1 },
];

const bandStyles = [
  { id: 1, bandId: 2, styleId: 7 },
  { id: 2, bandId: 3, styleId: 10 },
  { id: 3, bandId: 1, styleId: 2 },
  { id: 4, bandId: 2, styleId: 1 },
  { id: 5, bandId: 3, styleId: 3 },
  { id: 6, bandId: 2, styleId: 3 },
];

const bandAdStyles = [
  { id: 1, bandAdId: 2, styleId: 7 },
  { id: 2, bandAdId: 3, styleId: 10 },
  { id: 3, bandAdId: 1, styleId: 2 },
  { id: 4, bandAdId: 2, styleId: 1 },
  { id: 5, bandAdId: 3, styleId: 3 },
  { id: 6, bandAdId: 2, styleId: 3 },
];

const musicianAdStyles = [
  { id: 1, musicianAdId: 1, styleId: 1 },
  { id: 2, musicianAdId: 1, styleId: 2 },
  { id: 3, musicianAdId: 2, styleId: 3 },
];

const instruments = [
  { id: 1, name: "Guitare" },
  { id: 2, name: "Basse" },
  { id: 3, name: "Batterie" },
  { id: 4, name: "Chant" },
];

const run = async () =>
{
  console.info('Truncating collections...');
  for (const collectionName of ['Users', 'MusicianAds', 'BandAds', 'Styles', 'Musicians', 'Bands', 'Instruments', 'MusicianStyles', 'BandStyles', 'BandAdStyles', 'MusicianAdStyles'])
  {
    await faunaClient.query(
      fql.Map(
        fql.Paginate(
          fql.Match(
            fql.Index(`all${collectionName}`)
          )
        ),
        fql.Lambda('ref', fql.Delete(fql.Var('ref')))
      )
    );
  }

  // Create instruments
  console.info('Creating instruments...');
  for (const instrument of instruments)
  {
    const { id, name } = instrument;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('Instrument'),
          id,
        ),
        {
          data: {
            name
          }
        }
      )
    );
  }

  // Create users
  console.info('Creating users...');
  for (const user of users)
  {
    const { id, email, password } = user;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('User'),
          id,
        ),
        {
          data: {
            email
          },
          credentials: {
            password
          }
        }
      )
    );
  }

  // Create musicians
  console.info('Creating musicians...');
  for (const musician of musicians)
  {
    const { id, userId, email, firstName, lastName, bandId, isBandAdmin, instrumentId, city, objective, experience
    } = musician;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('Musician'),
          id,
        ),
        {
          data: {
            user: fql.Ref(
              fql.Collection('User'),
              userId,
            ),
            firstName,
            lastName,
            email,
            city,
            objective,
            experience,
            isBandAdmin,
            band: fql.Ref(
              fql.Collection('Band'),
              bandId,
            ),
            instrument: fql.Ref(
              fql.Collection('Instrument'),
              instrumentId,
            ),
          }
        }
      )
    );
  }

  // Create bands
  console.info('Creating bands...');
  for (const band of bands)
  {
    const { id, name, city, objective, experience, adminId } = band;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('Band'),
          id,
        ),
        {
          data: {
            name,
            city,
            objective,
            experience,
            admin: fql.Ref(
              fql.Collection('User'),
              adminId,
            ),
          }
        }
      )
    );
  }

  // Create musicianAds
  console.info('Creating musicianAds...');
  for (const musicianAd of musicianAds)
  {
    const { id, authorId, title, description, city } = musicianAd;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('MusicianAd'),
          id,
        ),
        {
          data: {
            title,
            description,
            author: fql.Ref(
              fql.Collection('Musician'),
              authorId,
            ),
            city
          }
        }
      )
    );
  }
  // Create bandAds
  console.info('Creating bandAds...');
  for (const bandAd of bandAds)
  {
    const { id, authorId, title, description, city } = bandAd;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('BandAd'),
          id,
        ),
        {
          data: {
            title,
            description,
            author: fql.Ref(
              fql.Collection('Band'),
              authorId,
            ),
            city
          }
        }
      )
    );
  }

  //Create styles
  console.log('Creating styles');
  for (const style of styles)
  {
    const { id, name } = style;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('Style'),
          id,
        ),
        {
          data: {
            name,
          }
        }
      )
    );
  }

  // Create musicianStyles
  console.info('Creating musicianStyles...');
  for (const musicianStyle of musicianStyles)
  {
    const { id, styleId, musicianId } = musicianStyle;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('MusicianStyle'),
          id,
        ),
        {
          data: {
            style: fql.Ref(
              fql.Collection('Style'),
              styleId
            ),
            musician: fql.Ref(
              fql.Collection("Musician"),
              musicianId,
            )
          }
        }
      )
    );
  }

  // Create bandStyles
  console.info('Creating bandStyles...');
  for (const bandStyle of bandStyles)
  {
    const { id, styleId, bandId } = bandStyle;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('BandStyle'),
          id,
        ),
        {
          data: {
            style: fql.Ref(
              fql.Collection('Style'),
              styleId
            ),
            band: fql.Ref(
              fql.Collection("Band"),
              bandId,
            )
          }
        }
      )
    );
  }

  // Create bandAdStyles
  console.info('Creating bandAdStyles...');
  for (const bandAdStyle of bandAdStyles)
  {
    const { id, styleId, bandAdId } = bandAdStyle;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('BandAdStyle'),
          id,
        ),
        {
          data: {
            style: fql.Ref(
              fql.Collection('Style'),
              styleId
            ),
            bandAd: fql.Ref(
              fql.Collection("BandAd"),
              bandAdId,
            )
          }
        }
      )
    );
  }

  // Create musicianAdStyles
  console.info('Creating musicianAdStyles...');
  for (const musicianAdStyle of musicianAdStyles)
  {
    const { id, styleId, musicianAdId } = musicianAdStyle;

    await faunaClient.query(
      fql.Create(
        fql.Ref(
          fql.Collection('MusicianAdStyle'),
          id,
        ),
        {
          data: {
            style: fql.Ref(
              fql.Collection('Style'),
              styleId
            ),
            musicianAd: fql.Ref(
              fql.Collection("MusicianAd"),
              musicianAdId,
            )
          }
        }
      )
    );
  }
};

// Run main process
run().catch((err) =>
{
  console.error(err);
  process.exit(1);
});
