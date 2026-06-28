'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const WaveMaterial = shaderMaterial(
    { uTime: 0.0, uResolution: new THREE.Vector2(800, 600) },

    // Vertex shader — clip-space quad, always fills screen
    `void main() {
     gl_Position = vec4(position.xy, 0.0, 1.0);
   }`,

    // Fragment shader
    `precision highp float;
   uniform float uTime;
   uniform vec2 uResolution;

   #define PI 3.14159265358979323846

   vec3 palette(in float t) {
     vec3 a = vec3(0.5, 0.5, 0.5);
     vec3 b = vec3(0.5, 0.5, 0.5);
     vec3 c = vec3(1.0, 1.0, 1.0);
     vec3 d = vec3(0.1, 0.4, 0.5);
     return a + b * cos(2.0 * PI * (c * t + d));
   }

   vec4 wave(vec2 uv, vec4 color, float amp, float freq, float phase, float thick, vec3 hue) {
     float x = uv.x - phase;
     float y = uv.y + amp * sin(freq * x);
     float bright = smoothstep(0.0, 1.0, 1.0 - abs(y) / thick);
     return vec4(vec3(bright) * hue, 1.0);
   }

   void main() {
     vec2 uv = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;
     vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

     for (float layer = 0.0; layer < 1.0; layer += 0.1) {
       float amp   = 0.25 + 0.25 * sin(uTime + layer) * (1.0 - layer);
       float freq  = 2.0;
       float phase = uTime * (1.0 - layer);
       float thick = 0.01 + 0.001 * pow(abs(uv.x), 8.0);
       vec3  hue   = palette(0.5 * uv.x + 1.0 * layer - 0.5 * uTime);
       color += wave(uv, color, amp, freq, phase, thick, hue);
     }

     gl_FragColor = color;
   }`,
);

extend({ WaveMaterial });

type WaveMaterialImpl = THREE.ShaderMaterial & {
    uTime: number;
    uResolution: THREE.Vector2;
};

declare module '@react-three/fiber' {
    interface ThreeElements {
        waveMaterial: ThreeElements['shaderMaterial'] & {
            ref?: React.Ref<WaveMaterialImpl>;
        };
    }
}

function Plane() {
    const materialRef = useRef<WaveMaterialImpl>(null!);
    const { size } = useThree();

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uResolution.set(size.width, size.height);
        }
    }, [size]);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uTime = clock.elapsedTime;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <waveMaterial
                ref={materialRef}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

function ShaderBackground() {
    return (
        <div className='fixed inset-0 -z-10'>
            <Canvas
                camera={{ position: [0, 0, 1] }}
                gl={{ antialias: false, alpha: false }}
                style={{ width: '100%', height: '100%' }}
            >
                <Plane />
            </Canvas>
        </div>
    );
}

export default dynamic(() => Promise.resolve(ShaderBackground), { ssr: false });
