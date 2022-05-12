const {sequelize} = require('./db');
const {Band, Musician,Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const newBand = await Band.create({
                name  : 'NWA',
                genre :  'rap'

        })

        expect(newBand.name).toBe('NWA');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const newMusician = await Musician.create({
            name  : 'ICE CUBE',
            genre :  'NONE'

    });
        expect(newMusician.name).toBe('ICE CUBE');
    })


    test('test association', async () => {
        const newMusician = await Musician.create({
            name  : 'EAZY E',
            genre :  'NONE'

    });
        const nwa = await Band.findByPk(1);
        await nwa.addMusician(1);
        await nwa.addMusician(2)

        const  musican = await Musician.findAll();
        console.log("All musicans:", musican[1]);
        
         expect(musican[0].dataValues.bandId).toBe(1);
         expect(musican[1].dataValues.bandId).toBe(1);
    })


    test('can create a Song', async () => {
        // TODO - test creating a song
        const newSong = await Song.create({
            title  : 'F THE POLICE',
            year :  1988

    });
        expect(newSong.title).toBe('F THE POLICE');
    })


    test('test man-many association', async () => {
        // TODO - test creating a song
        const newSong = await Song.create({
            title  : 'HATE IT OR LOVE IT',
            year :  2005

        });

        const newBand = await Band.create({
            name  : 'G-UNIT',
            genre :  'rap'

    })

        const nwa = await Band.findByPk(1);
        await nwa.addSong(1);
        await nwa.addSong(2)

        const fThePollice = await Song.findByPk(1);
        await fThePollice.addBand(1);
        await fThePollice.addBand(2);

        
        const songs = await Song.findAll({
            include : [Band]
        })

        //console.log('something',songs[0].dataValues.bands[0].dataValues.name);

        expect(songs[0].dataValues.bands[0].dataValues.name).toBe('NWA');
    })



})