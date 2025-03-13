document.addEventListener("DOMContentLoaded", function () {
    let slideshow = document.getElementById("slideshow");

    document.querySelector(".left-btn").addEventListener("click", function () {
        slideshow.scrollBy({ left: -380, behavior: "smooth" });
    });

    document.querySelector(".right-btn").addEventListener("click", function () {
        slideshow.scrollBy({ left: 380, behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('3d-container');
    if (!container) {
        console.error("3d-container not found!");
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Add ambient and spotlight lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xffffff, 1);
    spotlight.position.set(10, 50, 30);
    spotlight.castShadow = true;
    scene.add(spotlight);

    // Load the GLTF model
    const loader = new THREE.GLTFLoader();
    let model;
    loader.load('./assets/MixMinds.glb', function (gltf) {
        model = gltf.scene;
        model.scale.set(4, 6, 10);
        model.position.set(0, 0, 0);
        scene.add(model);

        model.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, undefined, function (error) {
        console.error("An error occurred while loading the model:", error);
    });

    // Set background color
    scene.background = new THREE.Color(0xeeeeee);

    // Camera position and rotation
    camera.position.set(0, 50, 40);
    camera.rotation.x = -Math.PI / 4;
    camera.lookAt(0, 0, 0); // Ensure the camera is looking at the model

    // Resize handling
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    function animate() {
        requestAnimationFrame(animate);

        // Rotate model
        if (model) {
            model.rotation.y += 0.003;
        }

        renderer.render(scene, camera);
    }
    animate();
});
