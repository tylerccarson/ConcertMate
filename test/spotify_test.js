let chai = require('chai');
let chaiHTTP = require('chai-http');
let server = require('../server/index.js');
let should = chai.should();

chai.use(chaiHTTP);

let token = 'BQA-j4dTLRLRjxgbsaG1wsFGFjow83cWWqTM5YwfMuP0vlYrGxInMMO9AO2BNuvIC6slPLa772lrhFPu2GRB-R3TYM6NXsRpcfw_U-KN1dqByjj6_AXOCxT9ZeMu6h-BWFXvAXpwkXFU32KRwrb3TRctZQqQqigNdN4';

describe('Spotify API', () => {
	beforeEach(() => {
		//get a token
	});

	describe('POST /spotify/search', () => {
		it('it should send back an artistId', (done) => {

			let data = {
				artist: 'Jimi Hendrix',
				token: token
			};

			chai.request(server)
				.post('/spotify/search')
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('artistId');
					res.body.artistId.should.equal('776Uo845nYHJpNaStv1Ds4');
					done();
				});
		});
	});

	describe('GET /spotify/callback', () => {
		it('it should redirect to localhost', (done) => {
			chai.request(server)
				.get('/spotify/callback')
				.end((err, res) => {
					res.should.redirectTo('http://localhost:8888/');
					done();
				});
		});
	});

});