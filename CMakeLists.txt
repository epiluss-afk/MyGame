cmake_minimum_required(VERSION 3.16)

project(MyGame LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(MyGame
    main.cpp
)

# Enable testing
include(CTest)

# Find GoogleTest package
find_package(GTest REQUIRED)

# Add test executable
add_executable(MyGameTests test_main.cpp)

# Link GoogleTest libraries
target_link_libraries(MyGameTests PRIVATE GTest::GTest GTest::Main)

# Register test in CTest
add_test(NAME MyGameTest COMMAND MyGameTests)


