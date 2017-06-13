// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function urlB64ToUint8Array(base64String) {
  const base64 = base64String + ('='.repeat(base64String.length % 4))
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const raw = window.atob(base64);

  const output = new Uint8Array(raw.length);
  Array.from(raw).forEach((c, i) => output[i] = c.charCodeAt(0));
  return output;
}

navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function(registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

navigator.serviceWorker && navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
  serviceWorkerRegistration.pushManager.getSubscription()  
    .then(function(subscription) {  
      // subscription will be null or a PushSubscription
      if (subscription) {
        console.info('Got existing', subscription);
        return;  // got one, yay
      }
      serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
        .then(function(subscription) { 
          console.info('Newly subscribed to push!', subscription);
        });
    });
});

