import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

window.addEventListener("DOMContentLoaded", function() {
  // get the canvas DOM element
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  // createScene function that creates and return the scene
  var createScene = function() {
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FlyCamera(
      "camera1",
      new BABYLON.Vector3(0, 8, -25),
      scene
    );

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      "./assets/models/lighthouse/",
      "Lighthouse.gltf",
      scene,
      function(scene) {}
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      "./assets/models/tugboat/",
      "Tugboat.gltf",
      scene,
      function([boat]) {
        boat.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        boat.position.x = -7;
        boat.position.y = -1;
      }
    );

    BABYLON.SceneLoader.ImportMesh(
      "",
      "./assets/models/tugboat/",
      "Tugboat.gltf",
      scene,
      function([boat]) {
        boat.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        boat.position.x = 2;
        boat.position.y = -1;
        boat.position.z = -7;
        boat.rotate(BABYLON.Axis.Y, 2);
      }
    );

    // create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    // var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // // move the sphere upward 1/2 of its height
    // sphere.position.y = 1;

    // // create a built-in "ground" shape;
    // var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // return the created scene
    return scene;
  };

  // call the createScene function
  var scene = createScene();

  // run the render loop
  engine.runRenderLoop(function() {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener("resize", function() {
    engine.resize();
  });
});
