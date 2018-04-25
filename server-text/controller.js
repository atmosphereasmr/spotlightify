module.exports = {
  getPlanes: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.get_planes()
      .then(messages => res.status(200).send(messages))
      .catch(error => console.log('error', error))
  },

  addPlane: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.add_plane(req.body)
      .then(spotlightify_users => res.status(200).send(spotlightify_users))
      .catch(error => console.log('error', error))
  },

  addArtist: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.add_artist(req.body)
      .then(spotlightify_users => res.status(200).send(spotlightify_users))
      .catch(error => console.log('error', error))
  },

  erase: (req, res, next) => {
    console.log(1)
    const dbInstance = req.app.get('db');

    dbInstance.erase(req.params.id)
      .then(messages => res.status(200).send(messages))
      .catch(error => console.log('error', error))
  },
}
