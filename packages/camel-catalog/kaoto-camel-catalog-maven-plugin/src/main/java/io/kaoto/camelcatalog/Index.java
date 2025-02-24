/*
 * Copyright (C) 2023 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.kaoto.camelcatalog;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

record Entry(String name, String version, String... files) {}

public class Index {
    public static final String COMPONENTS = "components";
    public static final String DATAFORMATS = "dataformats";
    public static final String LANGUAGES = "languages";
    public static final String MODELS = "models";

    private Map<String, Entry> catalogs = new HashMap<>();

    private List<Entry> schemas = new ArrayList<>();
    private List<Entry> kamelets = new ArrayList<>();

    public Map<String, Entry> getCatalogs() {
        return catalogs;
    }
    public List<Entry> getSchemas() {
        return schemas;
    }
    public List<Entry> getKamelets() {
        return kamelets;
    }
}

