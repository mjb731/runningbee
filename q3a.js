// Here’s an implementation in JavaScript that fulfills the requirements of the skibidi, lowKey, and yap functions. The solution retains the chainable lowKey functionality and achieves the intended usage.

// Implementation
// javascript
// Copy
// Edit
class Skibidi {
  constructor(asyncFunction) {
    this.asyncFunction = asyncFunction;
    this.errorHandler = null;
  }

  // Execute the async function and handle errors
  async execute() {
    try {
      return await this.asyncFunction();
    } catch (error) {
      if (this.errorHandler) {
        this.errorHandler(error);
      }
    }
  }

  // Chainable error handler
  lowKey(handler) {
    this.errorHandler = handler;
    return this;
  }
}

function skibidi(asyncFunction) {
  const instance = new Skibidi(asyncFunction);
  instance.execute(); // Start the async operation
  return instance;
}

function yap(message, error) {
  console.error(`[runningbee Logging] ${message}:`, error);
}

// Example usage
const userId = 42;

const user = skibidi(async () => {
  // Simulate finding a user
  const user = await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 42) reject(new Error("User not found"));
      else resolve({ id: userId, name: "Jane Doe" });
    }, 1000);
  });
  return user;
}).lowKey((error) => {
  yap("Error finding user", error);
});


// Explanation

// skibidi:
// Accepts an asynchronous function.
// Creates an instance of the Skibidi class, which handles the execution and chaining.

// lowKey:
// A method on the Skibidi class that attaches an error handler.
// Returns the Skibidi instance for chaining.

// yap:
// A utility function for logging errors with a standard format.

// Execution Flow:
// The asynchronous function is executed immediately when passed to skibidi.
// If an error occurs, the attached lowKey handler is invoked.
// Logging is performed via yap.


// or if needing multiple chains

class Skibidi {
    constructor(asyncFunction) {
      this.asyncFunction = asyncFunction;
      this.errorHandlers = [];
    }
  
    async execute() {
      try {
        return await this.asyncFunction();
      } catch (error) {
        for (const handler of this.errorHandlers) {
          handler(error);
        }
      }
    }
  
    lowKey(handler) {
      this.errorHandlers.push(handler); // Add the handler to the list
      return this;
    }
  }
  