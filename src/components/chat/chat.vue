<template>
  <div class="min-h-full flex" style="height: 87vh">
    <div class="w-1/4 bg-white border-r border-gray-300">
      <div
        class="p-4 flex items-center justify-between border-b border-gray-300"
      >
        <div class="text-xl font-bold">min_hiq</div>
        <i class="fas fa-edit text-xl"> </i>
      </div>
      <div class="flex justify-around border-b border-gray-300">
        <div class="py-2 px-4 border-b-2 border-black">Primary</div>
        <div class="py-2 px-4">General</div>
        <div class="py-2 px-4">Requests</div>
      </div>
      <div class="p-4 flex items-center">
        <img
          alt="Profile picture of a person looking at a flower"
          class="rounded-full w-12 h-12"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/w6e1eTNxEMgnrkdkoZWVmKFkVb55bnaIZV5XCR5CfYGy9ThnA.jpg"
          width="50"
        />
        <div class="ml-4">
          <div class="text-sm">Your note</div>
        </div>
      </div>
      <div class="p-4 flex items-center bg-gray-200">
        <img
          alt="Profile picture of Nguyễn Thị Ngọc Như"
          class="rounded-full w-12 h-12"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/3xbiUbVTIjZSJVNHTJWVFppsyXPA2Ppr3bwavi6r2E9ufU4JA.jpg"
          width="50"
        />
        <div class="ml-4">
          <div class="text-sm font-bold">Nguyễn Thị Ngọc Như</div>
          <div class="text-xs text-gray-500">Active 3h ago</div>
        </div>
      </div>
    </div>
    <div class="w-3/4 flex flex-col">
      <div
        class="p-4 flex items-center justify-between border-b border-gray-300"
      >
        <div class="flex items-center">
          <img
            alt="Profile picture of Nguyễn Thị Ngọc Như"
            class="rounded-full w-12 h-12"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/3xbiUbVTIjZSJVNHTJWVFppsyXPA2Ppr3bwavi6r2E9ufU4JA.jpg"
            width="50"
          />
          <div class="ml-4">
            <div class="text-lg font-bold">Nguyễn Thị Ngọc Như</div>
            <div class="text-sm text-gray-500">Active 3h ago</div>
          </div>
        </div>
        <div class="flex space-x-4">
          <i class="fas fa-phone text-xl"> </i>
          <i class="fas fa-video text-xl"> </i>
          <i class="fas fa-info-circle text-xl"> </i>
        </div>
      </div>
      <div class="flex-1 p-4 flex flex-col justify-end">
        <div class="flex items-center mb-4">
          <img
            alt="Profile picture of Nguyễn Thị Ngọc Như"
            class="rounded-full w-8 h-8"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/3xbiUbVTIjZSJVNHTJWVFppsyXPA2Ppr3bwavi6r2E9ufU4JA.jpg"
            width="50"
          />
          <div class="ml-4">
            <div class="text-sm bg-gray-200 p-2 rounded-lg">Hông á</div>
            <div class="text-xs text-gray-500 mt-1">20 Oct 2024, 13:29</div>
          </div>
        </div>
        <div class="flex items-center justify-end mb-4">
          <div class="mr-4">
            <div class="text-sm bg-blue-500 text-white p-2 rounded-lg">
              có vẻ quê hong
            </div>
            <div class="text-xs text-gray-500 mt-1 text-right">
              20 Oct 2024, 20:01
            </div>
          </div>
          <img
            alt="Profile picture of the user"
            class="rounded-full w-8 h-8"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/KZFftVOykFVJXq3hleuerK3cm9GtxbllSBRvDeokOVtq7nCPB.jpg"
            width="50"
          />
        </div>
      </div>
      <div class="p-4 border-t border-gray-300 flex items-center">
        <i class="far fa-smile text-xl mr-4"> </i>
        <input
          class="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Message..."
          type="text"
        />
        <i class="fas fa-microphone text-xl ml-4"> </i>
        <i class="far fa-image text-xl ml-4"> </i>
        <i class="far fa-heart text-xl ml-4"> </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBox",
};
</script>
