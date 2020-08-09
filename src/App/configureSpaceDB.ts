import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'

declare global {
  interface Window {
    projectSaveService: any
    containerSaveService: any
  }
}

function configureSpaceDB() {
  const spaceDB = feathers()
  const restClient = rest('http://192.168.1.81:30300') // spaceDB

  spaceDB.configure(restClient.fetch(window.fetch))
  window.projectSaveService = spaceDB.service('project-save-service')
  window.containerSaveService = spaceDB.service('container-save-service')
}

export default configureSpaceDB