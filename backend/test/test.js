/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const apiHost = 'http://localhost';
const apiPort = '3001';
const apiUrl = `${apiHost}:${apiPort}`;

let idToken = '';

const { expect } = chai;

it('GET Test server status', (done) => {
  chai
    .request(apiUrl)
    .get('/api/ping')
    .send()
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Splitwise API live');
      done();
    });
});

it('POST Create User 1', (done) => {
  chai.request(apiUrl)
    .post('/api/signup')
    .send({
      email: 'mocha1@test.com',
      password: 'mochates1',
      name: 'Mocha Test 1',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('NEW_USER_CREATED');
      done();
    });
});

it('POST Create User 2', (done) => {
  chai.request(apiUrl)
    .post('/api/signup')
    .send({
      email: 'mocha2@test.com',
      password: 'mochatest2',
      name: 'Mocha Test 2',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('NEW_USER_CREATED');
      done();
    });
});

it('POST Create User 3', (done) => {
  chai.request(apiUrl)
    .post('/api/signup')
    .send({
      email: 'mocha3@test.com',
      password: 'mochatest3',
      name: 'Mocha Test 3',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('NEW_USER_CREATED');
      done();
    });
});

it('POST Create User 44', (done) => {
  chai.request(apiUrl)
    .post('/api/signup')
    .send({
      email: 'mocha4@test.com',
      password: 'mochatest4',
      name: 'Mocha Test 4',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('NEW_USER_CREATED');
      done();
    });
});

it('POST Login User 1', (done) => {
  chai.request(apiUrl)
    .post('/api/login')
    .send({
      email: 'mocha1@test.com',
      password: 'mochates1',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('USER_LOGGED_IN');
      idToken = res.body.idToken;
      done();
    });
});

it('PUT Update profile User 1', (done) => {
  chai.request(apiUrl)
    .put('/api/profile')
    .set('Authorization', idToken)
    .send({
      email: 'mocha1@test.com',
      name: 'Macho Mocha',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('PROFILE_UPDATE_SUCCESS');
      done();
    });
});

it('POST Create group and Invite Members', (done) => {
  chai.request(apiUrl)
    .post('/api/groups')
    .set('Authorization', idToken)
    .send({
      groupName: 'Mocha Test Group',
      invitedMembers: [
        'mocha2@test.com',
        'mocha3@test.com',
      ],
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('GROUP_CREATED');
      done();
    });
});

it('POST Login User 2', (done) => {
  chai.request(apiUrl)
    .post('/api/login')
    .send({
      email: 'mocha2@test.com',
      password: 'mochatest2',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('USER_LOGGED_IN');
      idToken = res.body.idToken;
      done();
    });
});

it('GET Check Invitation for User 2', (done) => {
  chai.request(apiUrl)
    .get('/api/groups/invites')
    .set('Authorization', idToken)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.groupInvites)
        .to.be.an.instanceof(Array);
      done();
    });
});

it('POST Accept Invite for User 2', (done) => {
  chai.request(apiUrl)
    .post('/api/groups/accept')
    .set('Authorization', idToken)
    .send({ groupName: 'Mocha Test Group' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('INVITE_ACCEPTED');
      done();
    });
});

it('GET Check Memberships for User 2', (done) => {
  chai.request(apiUrl)
    .get('/api/groups/memberships')
    .set('Authorization', idToken)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.groupMemberships)
        .to.be.an.instanceof(Array);
      done();
    });
});
