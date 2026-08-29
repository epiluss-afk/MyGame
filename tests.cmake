# C++ Google Test configuration example
# Assuming you have GoogleTest installed and added to find path
# Add this to your CMakeLists.txt in the project root

# Enable testing
include(CTest)

# Add GoogleTest as an external project
find_package(GTest REQUIRED)

# Test source files
add_executable(MyGameTests test_main.cpp)

# Link libraries
target_link_libraries(MyGameTests PRIVATE GTest::GTest GTest::Main)

# Register test
add_test(NAME MyGameTest COMMAND MyGameTests)
