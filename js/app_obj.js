  var container;
  var camera, scene, renderer;
  var mouseX = 0, mouseY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  init();
  animate();
  function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 10;
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );
    // model
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
      }
    };
    var onError = function ( xhr ) { };
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader()
      .setPath( 'models/obj/max/' )
      .load( 'baymax.mtl', function ( materials ) {
        materials.preload();
        new THREE.OBJLoader()
          .setMaterials( materials )
          .setPath( 'models/obj/max/' )
          .load( 'baymax.obj', function ( object ) {
            object.position.y = - 5;
            scene.add( object );
          }, onProgress, onError );
      } );
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
  }
  //
  function animate() {
    requestAnimationFrame( animate );
    render();
  }
  function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .005;
    camera.position.y += ( - mouseY - camera.position.y ) * .005;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
  }
