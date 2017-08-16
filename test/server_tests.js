let chai = require('chai');
let chaiHTTP = require('chai-http');
let server = require('../server/index.js');
let should = chai.should();
let expect = require('chai').expect;

chai.use(chaiHTTP);

// Need to fetch a new token manually from here https://developer.spotify.com/web-api/console/get-audio-features-track/
let token = 'BQAqIKCIRwIueBXRi_pFsRRyJa_zh-w7FdpcQY7TQdR0TDlAOeCPDCF6NAtssY_tDp-wy66NRvhYZ8R9epQSqQtyhM8IpZ7ZGyIx-ob3La7D4kDcM9X3uIvm1ZNq7tlnXJKB_j2HemlUrUoI_nZ8GLb2HZMlGEkcANRjRAbHrCjSIwjygE-iM_ZR9i6DP-X7P8WUxiKO0d0a0yt78PTmcXiSIkMEVBWIk5urawwa7K5kvsMz_-eWevUWQlR1yGvUDDXIptaEeUKn7r8PDKc';

describe('Spotify API', () => {
	beforeEach(() => {
		// Write script to get a token
	});

	describe('GET /spotify/login', () => {
		it('it should send back a url to log in to Spotify, using client credentials', (done) => {
			chai.request(server)
				.get('/spotify/login')
				.end((err, res) => {
					res.should.have.status(200);
					expect(res).to.have.headers;
					expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
					res.text.should.equal('https://accounts.spotify.com/authorize?client_id=1b4dd6acf0c14120b5fa6ae37b4c773a&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fspotify%2Fcallback%2F&scope=user-read-private%20user-read-email&response_type=token');
					done();
				});
		});
	});

	describe('POST /spotify/search', () => {
		it('it should send back an artistId', (done) => {
			// Requires a refreshed token. Refer to line 8.
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