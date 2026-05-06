import Node from "./node.js";

class HashSet {
    constructor(){
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.capacity;
    }

    set(key) {
        const index = this.hash(key);
        let current = this.buckets[index];
    
        if (current === null) {
          this.buckets[index] = new Node(key);
          this.size++;
          return;
        }
    
        while (current !== null) {
          if (current.key === key) {
            return;
          }
          if (current.next === null) break;
          current = current.next;
        }
        current.next = new Node(key);
        this.size++;
    
        if(this.size > this.capacity * this.loadFactor){
          const allKeys = this.keys();
    
          this.capacity *= 2;
          this.buckets = new Array(this.capacity).fill(null);
          this.size = 0;
    
          allEntries.forEach((key) => {
            this.set(key);
          });
        }
    }

    get(key) {
        const index = this.hash(key);
        let current = this.buckets[index];

        while (current !== null) {
        if (current.key === key) {
            return current.value;
        }
        current = current.next;
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        let current = this.buckets[index];

        while (current !== null) {
        if (current.key === key) {
            return true;
        }
        current = current.next;
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        let current = this.buckets[index];  

        if (current === null) return false;

        if (current.key === key) {
        this.buckets[index] = current.next;
        this.size--;
        return true;
        }

        let prev = null;
        while (current !== null) {
        if (current.key === key) {
            prev.next = current.next;
            this.size--;
            return true;
        }
        prev = current;
        current = current.next;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.buckets.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        const result = [];

        for (let i=0; i<this.buckets.length; i++){
        let current = this.buckets[i];

        while (current !== null){
            result.push(current.key);
            current = current.next;
        }
        }
        return result;
    }
}

export default HashSet;