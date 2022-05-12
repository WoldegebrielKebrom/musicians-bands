const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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




})