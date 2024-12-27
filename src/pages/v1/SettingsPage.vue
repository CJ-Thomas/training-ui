<template>
    <div class="h-100 border rounded mt-5 p-3">
        <h5 class="row text-monospace text-left px-4 py-3" >settings</h5>
        <div class="row p-3">
            <div class="col-6 mb-3">
                <label class="col-12 text-left p-0">
                    User Name
                </label>
                <div class="input-group">
                    <input class="col-12 form-control" />
                    <div class="input-group-append">
                        <span class="input-group-text" role="button">edit</span>
                    </div>
                </div>
            </div>

            <div class="col-6 mb-3">
                <label class="col-12 text-left p-0">
                    Email
                </label>
                <div class="input-group">
                    <input class="col-12 form-control" />
                    <div class="input-group-append">
                        <span class="input-group-text" role="button">edit</span>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <label class="col-12 text-left p-0">
                    Bio
                </label>
                <div class="input-group">
                    <input class="col-12 form-control" />
                    <div class="input-group-append">
                        <span class="input-group-text" role="button">edit</span>
                    </div>
                </div>
            </div>
        </div>
        <span class="border row mx-3 my-4" ></span>
        <div class="row p-3">
            <div class="col-12 mb-3">
                <div class="input-group">
                    <input class="col-12 form-control" type="password" placeholder="current password" />
                </div>
            </div>
            <div class="col-6">
                <input class="col-12 form-control" type="password" placeholder="new password"/>
            </div>

            <div class="col-6">
                <input class="col-12 form-control" type="password" placeholder="confirm new password"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsPage'
}
</script>