module.exports = {
  tags: ['desktop'],
  'First Spec': function(client) {
    client.url(client.launch_url)
    .waitForElementVisible('body', 2000);

    client.expect.element('body').to.be.present;
    ['givenName', 'lastName', 'whatever'].forEach((fieldName) => {
      client.setValue(`[name="${fieldName}"]`, fieldName);
    });

    client.end();
  }
};
