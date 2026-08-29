// Initial game source file generated for project skeleton
#include <iostream>

#include <iostream>
#include <chrono>
#include <thread>
#include <atomic>

int main() {
    const int TARGET_FPS = 60;
    const std::chrono::milliseconds frameDuration(1000 / TARGET_FPS);

    int frame = 0;
    std::atomic<bool> running{true};

    std::cout << "Game loop started. Press q then Enter to quit.\n";

    while (running) {
        auto frameStart = std::chrono::steady_clock::now();

        // Render (placeholder)
        std::cout << "Frame " << frame++ << "\n";

        // Simple quit check: read a single character non-blocking isn't portable;
        // we instead check if user typed 'q' in the previous iteration.
        if (std::cin.rdbuf()->in_avail() > 0) {
            char c;
            std::cin >> c;
            if (c == 'q' || c == 'Q') {
                running = false;
            }
        }

        // Timing
        auto frameEnd = std::chrono::steady_clock::now();
        auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(frameEnd - frameStart);
        if (elapsed < frameDuration) {
            std::this_thread::sleep_for(frameDuration - elapsed);
        }
    }

    std::cout << "Game loop exited after " << frame << " frames.\n";
    return 0;
}

